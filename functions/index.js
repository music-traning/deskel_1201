const functions = require("firebase-functions");
const admin = require("firebase-admin");

// ★TODO: Stripeのダッシュボードから取得したシークレットキーに書き換えてください
// テスト用: sk_test_... / 本番用: sk_live_...
const stripe = require("stripe")("sk_test_REPLACE_THIS_WITH_YOUR_SECRET_KEY");

// ★TODO: Stripe CLIまたはダッシュボードでWebhookを作成し、署名シークレットをここに貼り付けてください
// 例: whsec_...
const endpointSecret = "whsec_REPLACE_THIS_WITH_YOUR_WEBHOOK_SECRET";

admin.initializeApp();

/**
 * StripeからのWebhookを受け取る関数
 * URL: https://us-central1-deskel-app.cloudfunctions.net/stripeWebhook
 */
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        // 署名の検証 (rawBodyが必要です)
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
        console.error(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // イベントの処理
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.client_reference_id;

        if (userId) {
            console.log(`✅ Payment success for user: ${userId}`);

            try {
                // Firestoreのcustomersコレクションを更新
                // customers/{uid} ドキュメントに { isPremium: true } をセット
                await admin.firestore().collection("customers").doc(userId).set({
                    isPremium: true,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                    stripeCustomerId: session.customer,
                    paymentIntentId: session.payment_intent,
                    email: session.customer_details ? session.customer_details.email : null
                }, { merge: true });

                console.log(`🎉 Successfully upgraded user ${userId} to Premium.`);
            } catch (error) {
                console.error("❌ Error updating Firestore:", error);
                return res.status(500).send("Internal Server Error");
            }
        } else {
            console.warn("⚠️  No client_reference_id found in session.");
        }
    }

    res.json({ received: true });
});
