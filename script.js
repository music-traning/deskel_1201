import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// ★変更: Popup方式に戻しました
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// === ★設定エリア（ここを書き換えてください） ===

// 1. Firebaseの接続情報
// 全機能開放デモモードのため、接続情報を無効化
// const firebaseConfig = {
//   apiKey: "AIzaSyA_A5BqSP48YSiZU90jFn94g1ccyCnKS1g",
//   authDomain: "deskel-app.firebaseapp.com",
//   projectId: "deskel-app",
//   storageBucket: "deskel-app.firebasestorage.app",
//   messagingSenderId: "1022422619356",
//   appId: "1:1022422619356:web:c1a2008fafcf4499021019"
// };

// 2. Stripeの支払いリンク
const STRIPE_PAYMENT_URL = null; // ★ 決済機能を無効化

// =============================================

// アプリの初期化 (Firebase関連の行を無効化)
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const provider = new GoogleAuthProvider();

// 言語データ
const LANGUAGE_STRINGS = {
  'ja': {
    'LOGIN_REQUIRED': '購入データの紐付けに必要なため、\n先にGoogleログインをお願いします。',
    'BTN_LABEL': '🇯🇵 Japan',
    'LOGIN': 'G ログイン',
    'IMPORT': '📁 読込',
    'CAMERA': '📷 カメラ',
    'BTN_GRID_TYPE': '▦ 構図',
    'TOKUSHO_BTN': '特定商取引法に基づく表記',
    'TOKUSHO_TITLE': '特定商取引法に基づく表記',
    'BTN_CLOSE_SIMPLE': '閉じる',
    'SIZE_HEADER': 'キャンバスサイズ',
    'SIZE_STANDARD': 'A4/B4 (ISO)',
    'SIZE_MOKUTAN': '木炭紙 (全判)',
    'SIZE_F': 'F (Figure)',
    'SIZE_P': 'P (Paysage)',
    'SIZE_M': 'M (Marine)',
    'SIZE_SQUARE': 'S (Square)',
    'SIZE_US_LETTER': 'Letter (8.5x11)',
    'SIZE_US_1620': 'US Photo (4:5)',
    'SIZE_US_1824': 'US Poster (3:4)',
    'SIZE_EU_ISO': 'ISO A-Series',
    'SIZE_EU_FIG': 'Europe Figure',
    'PREMIUM_TITLE': '💎 Proプランにアップグレード',
    'PREMIUM_DESC': `
      <div style="text-align:left; margin:0 auto; display:inline-block;">
      <b>プロフェッショナルのための機能</b><br>
      ✅ 全キャンバスサイズの解放<br>
      </div><br><br>
      たった300円(税込)で、<br>あなたのデッサン環境を完成させましょう。
    `,
    'PREMIUM_WARNING': '※買い切りタイプです。月額課金ではありません。',
    'PURCHASE': '¥300ですべて解放する',
    'CLOSE': 'キャンセル',
    'SAVE_TITLE': '撮影しました',
    'SAVE_DESC': '保存後、共有メニューから「画像を保存」や「フォト」を選択してください。',
    'SAVE_BTN_MAIN': '💾 画像を保存・共有',
    'HELP_TITLE': '使い方ガイド',
    'HELP_CONTENT': `
      <h4>📱 推奨：アプリとして使う</h4>
      <p>このページをホーム画面に追加すると、アドレスバーが消えて画面を広く使えます。</p>
      <ul>
        <li><strong>iPhone (Safari):</strong> 下の共有ボタン <span style="font-size:1.2em">📤</span> → 「ホーム画面に追加」</li>
        <li><strong>Android (Chrome):</strong> 右上メニュー → 「アプリをインストール」または「ホーム画面に追加」</li>
      </ul>
      
      <hr style="border:0; border-top:1px solid #444; margin:15px 0;">

      <h4>🖐 基本操作</h4>
      <ul>
        <li><strong>拡大・縮小:</strong> 画面を2本指でピンチ</li>
        <li><strong>画像の移動:</strong> 指でドラッグ (※「読込」画像のみ)</li>
        <li><strong>👁️ 没入モード (右上):</strong> メニューを全て消して、画面をスッキリさせます。もう一度押すと戻ります。</li>
      </ul>

      <h4>🔘 ツールバーの機能</h4>
      <ul>
        <li><strong>▦ グリッド切替:</strong> 4分割 / 3分割 / 対角線(クロス)</li>
        <li><strong>🎨 色変更:</strong> モチーフに合わせて見やすい色に変更 (白/黒/赤/緑/水色)</li>
        <li><strong>🔄 回転:</strong> 縦構図・横構図の切り替え</li>
        <li><strong>サイズ選択:</strong> 画面下のバーをタップして、F号や木炭紙サイズなどを選択</li>
      </ul>

      <div style="background:#333; padding:10px; border-radius:8px; margin-top:10px;">
        <strong>💡 ヒント:</strong><br>
        「📷 カメラ」は風景や静物のデッサンに。<br>
        「📁 読込」は写真模写の練習に便利です。
      </div>

      <div style="background:rgba(255,0,0,0.15); border:1px solid #ff5555; padding:10px; border-radius:8px; margin-top:15px;">
        <strong style="color:#ff8888;">⚠️ 購入前のご注意</strong><br>
        デジタルコンテンツの特性上、<strong>購入後の返金はできません</strong>。<br>
        必ずこのデモ版で、お使いの機種での動作や使い心地を十分にお確かめの上、ご納得いただいてからご購入ください。
      </div>`,
    'LEGAL_DATA': {
      '販売業者': 'U.M.A web',
      '運営統括責任者': '[代表者氏名を入力]',
      '所在地': '[住所を入力してください]',
      '電話番号': '[電話番号を入力]',
      'メールアドレス': 'your-email@example.com',
      '販売価格': '300円（税込）',
      '商品代金以外の必要料金': 'インターネット接続料金、通信料金等はお客様の負担となります。',
      'お支払方法': 'クレジットカード決済 (Stripe)',
      '代金の支払時期': 'ご利用のクレジットカード会社の締め日や契約内容により異なります。',
      '引渡時期': '決済完了後、即時に有料機能が利用可能になります。',
      '返品・交換について': 'デジタルコンテンツの特性上、購入確定後の返品・交換・キャンセルには応じられません。予めご了承ください。'
    }
  },
  'us': {
    'LOGIN_REQUIRED': 'Please sign in first\nto link your purchase.',
    'BTN_LABEL': '🇺🇸 USA',
    'LOGIN': 'Sign In',
    'IMPORT': 'Import',
    'CAMERA': 'Camera',
    'BTN_GRID_TYPE': '▦ Grid',
    'TOKUSHO_BTN': 'Legal Notice',
    'TOKUSHO_TITLE': 'Legal Notice',
    'BTN_CLOSE_SIMPLE': 'Close',
    'SIZE_HEADER': 'Canvas Size',
    'SIZE_STANDARD': 'A-Series (ISO)',
    'SIZE_MOKUTAN': 'Charcoal (JP)',
    'SIZE_F': 'F-Size',
    'SIZE_P': 'P-Size',
    'SIZE_M': 'M-Size',
    'SIZE_SQUARE': 'S (Square)',
    'SIZE_US_LETTER': 'Letter (8.5x11 in)',
    'SIZE_US_1620': '16x20 in (4:5)',
    'SIZE_US_1824': '18x24 in (3:4)',
    'SIZE_EU_ISO': 'ISO A-Series',
    'SIZE_EU_FIG': 'Europe Figure',
    'PREMIUM_TITLE': '💎 Upgrade to Pro',
    'PREMIUM_DESC': 'Unlock all canvas sizes<br>and High-Res export.',
    'PREMIUM_WARNING': 'One-time purchase.',
    'PURCHASE': 'Unlock All for $3.00',
    'CLOSE': 'Cancel',
    'SAVE_TITLE': 'Captured',
    'SAVE_DESC': 'Select "Save Image" or "Photos" from the share menu.',
    'SAVE_BTN_MAIN': '💾 Save / Share',
    'HELP_TITLE': 'User Guide',
    'HELP_CONTENT': `
      <h4>📱 Install App</h4>
      <p>Add to Home Screen for the best experience (Full Screen).</p>
      <ul>
        <li><strong>iOS (Safari):</strong> Tap Share <span style="font-size:1.2em">📤</span> -> "Add to Home Screen"</li>
        <li><strong>Android (Chrome):</strong> Tap Menu -> "Install App"</li>
      </ul>

      <hr style="border:0; border-top:1px solid #444; margin:15px 0;">

      <h4>🖐 Touch Controls</h4>
      <ul>
        <li><strong>Zoom:</strong> Pinch with 2 fingers.</li>
        <li><strong>Move:</strong> Drag with 1 finger (Imported Image only).</li>
        <li><strong>👁️ Immersive Mode (Top Right):</strong> Hide all menus to focus on your art. Tap again to show.</li>
      </ul>

      <h4>🔘 Toolbar</h4>
      <ul>
        <li><strong>▦ Grid:</strong> Toggle 4x4 / 3x3 / Diagonal.</li>
        <li><strong>🎨 Color:</strong> Change grid color (White/Black/Red/etc).</li>
        <li><strong>🔄 Rotate:</strong> Switch Portrait / Landscape.</li>
        <li><strong>Size Select:</strong> Tap the bottom bar to choose canvas ratio.</li>
      </ul>

      <div style="background:#333; padding:10px; border-radius:8px; margin-top:10px;">
        <strong>💡 Tip:</strong><br>
        Use "📷 Camera" for life drawing.<br>
        Use "📁 Import" for photo reference study.
      </div>
      
      <div style="background:rgba(255,0,0,0.15); border:1px solid #ff5555; padding:10px; border-radius:8px; margin-top:15px;">
        <strong style="color:#ff8888;">⚠️ Important: Before You Buy</strong><br>
        Due to the nature of digital content, <strong>all sales are final and non-refundable</strong>.<br>
        Please fully test this demo version to ensure it works with your device before purchasing.
      </div>`,
    'LEGAL_DATA': {
      'Distributor': 'U.M.A web',
      'Representative': '[Enter Name]',
      'Address': '[Enter Address]',
      'Phone': '[Enter Phone Number]',
      'Email': 'your-email@example.com',
      'Selling Price': '$3.00 (Tax incl.)',
      'Additional Fees': 'Internet connection charges are borne by the customer.',
      'Payment Method': 'Credit Card (Stripe)',
      'Payment Period': 'Processed immediately upon purchase.',
      'Delivery Time': 'Access is granted immediately after payment.',
      'Refund Policy': 'Due to the nature of digital content, all sales are final. No refunds or exchanges are accepted.'
    }
  },
  'eu': {
    'LOGIN_REQUIRED': 'Please sign in first\nto link your purchase.',
    'BTN_LABEL': '🇪🇺 Europe',
    'LOGIN': 'Sign In',
    'IMPORT': 'Import',
    'CAMERA': 'Camera',
    'BTN_GRID_TYPE': '▦ Grid',
    'TOKUSHO_BTN': 'Legal Notice',
    'TOKUSHO_TITLE': 'Legal Notice',
    'BTN_CLOSE_SIMPLE': 'Close',
    'SIZE_HEADER': 'Canvas Size',
    'SIZE_STANDARD': 'ISO A-Series',
    'SIZE_MOKUTAN': 'Charcoal (JP)',
    'SIZE_F': 'F-Size',
    'SIZE_P': 'P-Size',
    'SIZE_M': 'M-Size',
    'SIZE_SQUARE': 'S (Square)',
    'SIZE_US_LETTER': 'US Letter (8.5x11)',
    'SIZE_US_1620': 'US 16x20 (4:5)',
    'SIZE_US_1824': 'US 18x24 (3:4)',
    'SIZE_EU_ISO': 'ISO A-Series',
    'SIZE_EU_FIG': 'Europe Figure',
    'PREMIUM_TITLE': '💎 Upgrade to Pro',
    'PREMIUM_DESC': 'Unlock all canvas sizes<br>and High-Res export.',
    'PREMIUM_WARNING': 'One-time purchase.',
    'PURCHASE': 'Unlock All for $3.00',
    'CLOSE': 'Cancel',
    'SAVE_TITLE': 'Captured',
    'SAVE_DESC': 'Select "Save Image" or "Photos" from the share menu.',
    'SAVE_BTN_MAIN': '💾 Save / Share',
    'HELP_TITLE': 'User Guide',
    'HELP_CONTENT': `
      <h4>📱 Install App</h4>
      <p>Add to Home Screen for the best experience (Full Screen).</p>
      <ul>
        <li><strong>iOS (Safari):</strong> Tap Share <span style="font-size:1.2em">📤</span> -> "Add to Home Screen"</li>
        <li><strong>Android (Chrome):</strong> Tap Menu -> "Install App"</li>
      </ul>

      <hr style="border:0; border-top:1px solid #444; margin:15px 0;">

      <h4>🖐 Touch Controls</h4>
      <ul>
        <li><strong>Zoom:</strong> Pinch with 2 fingers.</li>
        <li><strong>Move:</strong> Drag with 1 finger (Imported Image only).</li>
        <li><strong>👁️ Immersive Mode (Top Right):</strong> Hide all menus to focus on your art. Tap again to show.</li>
      </ul>

      <h4>🔘 Toolbar</h4>
      <ul>
        <li><strong>▦ Grid:</strong> Toggle 4x4 / 3x3 / Diagonal.</li>
        <li><strong>🎨 Color:</strong> Change grid color (White/Black/Red/etc).</li>
        <li><strong>🔄 Rotate:</strong> Switch Portrait / Landscape.</li>
        <li><strong>Size Select:</strong> Tap the bottom bar to choose canvas ratio.</li>
      </ul>

      <div style="background:#333; padding:10px; border-radius:8px; margin-top:10px;">
        <strong>💡 Tip:</strong><br>
        Use "📷 Camera" for life drawing.<br>
        Use "📁 Import" for photo reference study.
      </div>

      <div style="background:rgba(255,0,0,0.15); border:1px solid #ff5555; padding:10px; border-radius:8px; margin-top:15px;">
        <strong style="color:#ff8888;">⚠️ Important: Before You Buy</strong><br>
        Due to the nature of digital content, <strong>all sales are final</strong>. By purchasing, you acknowledge that you lose your right of withdrawal once access starts.<br>
        Please fully test this demo version to ensure compatibility before upgrading.
      </div>`,
    'LEGAL_DATA': {
      'Distributor': 'U.M.A web',
      'Representative': '[Enter Name]',
      'Address': '[Enter Address]',
      'Phone': '[Enter Phone Number]',
      'Email': 'your-email@example.com',
      'Selling Price': '€3.00 (Tax incl.)',
      'Additional Fees': 'Internet connection charges are borne by the customer.',
      'Payment Method': 'Credit Card (Stripe)',
      'Payment Period': 'Processed immediately upon purchase.',
      'Delivery Time': 'Access is granted immediately after payment.',
      'Refund Policy': 'Digital content is not eligible for withdrawal rights once access has started.'
    }
  }
};

let currentRegion = 'ja';
let isUserPremium = true; // ★ 常に true に設定し、全てのサイズを解放
let currentUser = null; // ★ 常に null に設定し、ログインを不要に
let unsubscribeUser = null;

// === 状態管理 ===
const state = {
  zoom: 1.0,
  translateX: 0,
  translateY: 0,
  isDragging: false,
  startDist: 0,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  gridType: 0
};

const GRID_TYPES = ['grid-4x4', 'grid-3x3', 'grid-cross'];

// ★変更: ログイン処理を無効化
window.signIn = () => {
  console.log("デモモード: ログイン処理は無効です。");
  alert("デモモード: ログイン機能は無効です。Pro機能は解放されています。");
};

// ログイン監視 & 有料会員チェック (Firestore連携・リアルタイム版) は無効化

const RATIO_DATA = [
  { id: 'standard', label_key: 'SIZE_STANDARD', ratio: 297 / 210, regions: ['ja'], isPro: false },
  { id: 'mokutan', label_key: 'SIZE_MOKUTAN', ratio: 650 / 500, regions: ['ja'], isPro: true },
  { id: 'f-size', label_key: 'SIZE_F', ratio: 410 / 318, regions: ['ja', 'us', 'eu'], isPro: true },
  { id: 'p-size', label_key: 'SIZE_P', ratio: 530 / 410, regions: ['ja', 'us', 'eu'], isPro: true },
  { id: 'm-size', label_key: 'SIZE_M', ratio: 530 / 333, regions: ['ja', 'us', 'eu'], isPro: true },
  { id: 'square', label_key: 'SIZE_SQUARE', ratio: 1.00, regions: ['ja', 'us', 'eu'], isPro: true },
  { id: 'us-letter', label_key: 'SIZE_US_LETTER', ratio: 11 / 8.5, regions: ['us'], isPro: false },
  { id: 'us-16x20', label_key: 'SIZE_US_1620', ratio: 20 / 16, regions: ['us'], isPro: true },
  { id: 'us-18x24', label_key: 'SIZE_US_1824', ratio: 24 / 18, regions: ['us'], isPro: true },
  { id: 'eu-iso', label_key: 'SIZE_EU_ISO', ratio: 297 / 210, regions: ['eu'], isPro: false },
  { id: 'eu-fig', label_key: 'SIZE_EU_FIG', ratio: 1.25, regions: ['eu'], isPro: true }
];

const GRID_COLORS = ['rgba(255, 255, 255, 0.9)', 'rgba(0, 0, 0, 0.8)', '#ff0000', '#00ff00', '#00ffff'];
let gridColorIdx = 0;
let currentBaseRatio = 297 / 210;
let isLandscape = false;
let isUsingCamera = true;
let isImmersive = false;

const video = document.getElementById('camera-video');
const importedImg = document.getElementById('imported-image');
const frame = document.getElementById('guide-frame');
const transformWrapper = document.getElementById('transform-wrapper');
const slider = document.getElementById('zoom-slider');
const touchArea = document.getElementById('touch-area');

window.toggleImmersiveMode = () => {
  isImmersive = !isImmersive;
  document.body.classList.toggle('immersive-mode', isImmersive);
  const btn = document.getElementById('btn-toggle-ui');
  btn.innerText = isImmersive ? '❌' : '👁️';
};

window.closeOnboarding = () => {
  document.getElementById('onboarding-overlay').style.display = 'none';
  localStorage.setItem('deskel_intro_done_v3', 'true');
};
if (!localStorage.getItem('deskel_intro_done_v3')) {
  document.getElementById('onboarding-overlay').style.display = 'flex';
}

window.toggleGridType = () => {
  state.gridType = (state.gridType + 1) % GRID_TYPES.length;
  updateGridDisplay();
  if (navigator.vibrate) navigator.vibrate(30);
};

function updateGridDisplay() {
  frame.className = '';
  frame.classList.add(GRID_TYPES[state.gridType]);
  frame.innerHTML = '';

  if (state.gridType === 0) {
    for (let i = 1; i <= 3; i++) {
      frame.innerHTML += `<div class="grid-line grid-line-v v${i}"></div>`;
      frame.innerHTML += `<div class="grid-line grid-line-h h${i}"></div>`;
    }
  } else if (state.gridType === 1) {
    for (let i = 1; i <= 2; i++) {
      frame.innerHTML += `<div class="grid-line grid-line-v v${i}"></div>`;
      frame.innerHTML += `<div class="grid-line grid-line-h h${i}"></div>`;
    }
  } else {
    frame.innerHTML = `<svg><line x1="0" y1="0" x2="100%" y2="100%" /><line x1="100%" y1="0" x2="0" y2="100%" /></svg>`;
  }
}

window.toggleGridColor = () => {
  gridColorIdx = (gridColorIdx + 1) % GRID_COLORS.length;
  document.documentElement.style.setProperty('--grid-color', GRID_COLORS[gridColorIdx]);
};

window.toggleOrientation = () => {
  isLandscape = !isLandscape;
  document.getElementById('btn-rotate').classList.toggle('active', isLandscape);
  updateShape(currentBaseRatio);
};

function updateShape(baseRatio) {
  currentBaseRatio = baseRatio;
  const effectiveRatio = isLandscape ? (1 / baseRatio) : baseRatio;

  const sw = window.innerWidth;
  const sh = window.innerHeight;
  const safeHeight = sh - 60 - 240;

  let w = sw * 0.9;
  let h = w * effectiveRatio;

  if (h > safeHeight) { h = safeHeight; w = h / effectiveRatio; }
  if (w > sw * 0.95) { w = sw * 0.95; h = w * effectiveRatio; }

  frame.style.width = w + 'px';
  frame.style.height = h + 'px';

  const topOffset = 60 + (safeHeight - h) / 2;
  document.getElementById('overlay-layer').style.top = topOffset + 'px';
  document.getElementById('overlay-layer').style.height = safeHeight + 'px';
}

function updateTransform() {
  const scale = `scale(${state.zoom})`;
  const translate = `translate(${state.translateX}px, ${state.translateY}px)`;
  transformWrapper.style.transform = `${translate} ${scale}`;
  slider.value = state.zoom;
}

touchArea.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    state.startDist = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    state.startZoom = state.zoom;
  } else if (e.touches.length === 1 && !isUsingCamera) {
    state.isDragging = true;
    state.startX = e.touches[0].pageX - state.translateX;
    state.startY = e.touches[0].pageY - state.translateY;
  }
}, { passive: false });

touchArea.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const dist = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    if (state.startDist > 0) {
      const scale = (dist / state.startDist) * state.startZoom;
      state.zoom = Math.min(Math.max(scale, 1.0), 5.0);
      updateTransform();
    }
  } else if (e.touches.length === 1 && state.isDragging) {
    e.preventDefault();
    state.translateX = e.touches[0].pageX - state.startX;
    state.translateY = e.touches[0].pageY - state.startY;
    updateTransform();
  }
}, { passive: false });

touchArea.addEventListener('touchend', () => {
  state.isDragging = false;
  state.startDist = 0;
});

slider.addEventListener('input', (e) => {
  state.zoom = parseFloat(e.target.value);
  updateTransform();
});

async function startCamera() {
  const constraints = { video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.style.display = 'block';
    importedImg.style.display = 'none';
    isUsingCamera = true;
    resetTransform();
  } catch (e) {
    console.log("Camera error:", e);
  }
}

document.getElementById('btn-import').onclick = () => document.getElementById('file-input').click();
document.getElementById('file-input').onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    importedImg.src = evt.target.result;
    importedImg.style.display = 'block';
    video.style.display = 'none';
    if (video.srcObject) video.srcObject.getTracks().forEach(t => t.stop());
    isUsingCamera = false;
    resetTransform();
  };
  reader.readAsDataURL(file);
};

document.getElementById('btn-camera').onclick = startCamera;

function resetTransform() {
  state.zoom = 1.0;
  state.translateX = 0;
  state.translateY = 0;
  updateTransform();
}

document.getElementById('shutter-btn').onclick = () => {
  if (navigator.vibrate) navigator.vibrate(50);
  const canvas = document.getElementById('photo-canvas');
  const ctx = canvas.getContext('2d');

  const frameRect = frame.getBoundingClientRect();
  const wrapperRect = transformWrapper.getBoundingClientRect();

  let sourceElem = isUsingCamera ? video : importedImg;
  let naturalW = isUsingCamera ? video.videoWidth : importedImg.naturalWidth;
  let naturalH = isUsingCamera ? video.videoHeight : importedImg.naturalHeight;

  if (!naturalW || !naturalH) return;

  const displayW = wrapperRect.width / state.zoom;
  const displayH = wrapperRect.height / state.zoom;
  const scaleX = naturalW / displayW;
  const scaleY = naturalH / displayH;

  const relX = (frameRect.left - wrapperRect.left) / state.zoom;
  const relY = (frameRect.top - wrapperRect.top) / state.zoom;
  const relW = frameRect.width / state.zoom;
  const relH = frameRect.height / state.zoom;

  const sourceX = relX * scaleX;
  const sourceY = relY * scaleY;
  const sourceW = relW * scaleX;
  const sourceH = relH * scaleY;

  canvas.width = sourceW;
  canvas.height = sourceH;

  ctx.drawImage(sourceElem, sourceX, sourceY, sourceW, sourceH, 0, 0, sourceW, sourceH);

  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--grid-color').trim();
  ctx.lineWidth = sourceW * 0.005;

  if (state.gridType === 0) {
    for (let i = 1; i <= 3; i++) {
      const p = i * (sourceW / 4);
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, sourceH); ctx.stroke();
      const q = i * (sourceH / 4);
      ctx.beginPath(); ctx.moveTo(0, q); ctx.lineTo(sourceW, q); ctx.stroke();
    }
  } else if (state.gridType === 1) {
    for (let i = 1; i <= 2; i++) {
      const p = i * (sourceW / 3);
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, sourceH); ctx.stroke();
      const q = i * (sourceH / 3);
      ctx.beginPath(); ctx.moveTo(0, q); ctx.lineTo(sourceW, q); ctx.stroke();
    }
  } else {
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sourceW, sourceH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sourceW, 0); ctx.lineTo(0, sourceH); ctx.stroke();
  }
  ctx.strokeRect(0, 0, sourceW, sourceH);

  const dataURL = canvas.toDataURL('image/png');
  document.getElementById('preview-img').src = dataURL;

  const btnSave = document.getElementById('btn-main-save');
  btnSave.innerText = LANGUAGE_STRINGS[currentRegion]['SAVE_BTN_MAIN'];
  btnSave.onclick = async () => {
    try {
      const blob = await (await fetch(dataURL)).blob();
      const file = new File([blob], "deskel_art.png", { type: "image/png" });
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Deskel', text: 'Created with Deskel App' });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `deskel_${Date.now()}.png`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      }
    } catch (err) { console.error(err); }
  };
  document.getElementById('save-modal').style.display = 'flex';
};

window.openSizePanel = () => document.getElementById('size-panel').classList.add('open');
window.closeSizePanel = () => document.getElementById('size-panel').classList.remove('open');
window.openHelp = () => {
  const dict = LANGUAGE_STRINGS[currentRegion];
  document.getElementById('text-help-title').innerText = dict['HELP_TITLE'];
  document.getElementById('help-content-area').innerHTML = dict['HELP_CONTENT'];
  document.getElementById('help-modal').style.display = 'flex';
};
window.closeHelp = () => document.getElementById('help-modal').style.display = 'none';
window.closeModal = () => document.getElementById('modal').style.display = 'none';
window.closeSaveModal = () => document.getElementById('save-modal').style.display = 'none';

// === 決済機能の連携 ===
window.startPaymentLink = () => {
  // ★ 決済処理を無効化
  alert("デモモード: 決済機能は無効です。Pro機能は解放されています。");
};

window.openTokusho = () => {
  const dict = LANGUAGE_STRINGS[currentRegion];
  document.getElementById('text-tokusho-title').innerText = dict['TOKUSHO_TITLE'];

  const table = document.getElementById('tokusho-table');
  table.innerHTML = '';

  for (const [key, val] of Object.entries(dict['LEGAL_DATA'])) {
    const row = document.createElement('tr');
    row.innerHTML = `<th>${key}</th><td>${val}</td>`;
    table.appendChild(row);
  }

  document.getElementById('tokusho-modal').style.display = 'flex';
};
window.closeTokusho = () => { document.getElementById('tokusho-modal').style.display = 'none'; };

function renderButtons() {
  const panelGrid = document.getElementById('panel-grid-container');
  panelGrid.innerHTML = '';
  const currentItem = RATIO_DATA.find(item => Math.abs(item.ratio - currentBaseRatio) < 0.001);
  if (currentItem) document.getElementById('current-size-label').innerText = LANGUAGE_STRINGS[currentRegion][currentItem.label_key] || "サイズ";

  RATIO_DATA.forEach(item => {
    if (!item.regions.includes(currentRegion)) return;
    const btn = document.createElement('button');
    btn.className = 'panel-size-btn';

    if (Math.abs(item.ratio - currentBaseRatio) < 0.001) btn.classList.add('active');

    let label = LANGUAGE_STRINGS[currentRegion][item.label_key] || item.id;

    // isUserPremiumがtrueなので、ロックの判定は常にfalseになるが、isProがtrueの項目は念のため「🔒」を外す
    // isUserPremium = true のため、全てのサイズが選択可能
    // const isLocked = item.isPro && !isUserPremium; 
    
    // if (isLocked) { // ロックアウト処理を無効化
    //   label = '🔒 ' + label;
    //   btn.style.opacity = '0.7';
    // }

    btn.innerText = label;

    btn.onclick = () => {
      // ロックアウト処理を無効化しているため、すぐにサイズ変更へ進む
      document.querySelectorAll('.panel-size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      isLandscape = false;
      document.getElementById('btn-rotate').classList.remove('active');
      updateShape(item.ratio);
      document.getElementById('current-size-label').innerText = btn.innerText;
      closeSizePanel();
    };
    panelGrid.appendChild(btn);
  });
}

function updateUITexts() {
  const dict = LANGUAGE_STRINGS[currentRegion];
  document.getElementById('btn-lang').innerText = dict['BTN_LABEL'];
  document.getElementById('btn-import').innerText = dict['IMPORT'];
  document.getElementById('btn-camera').innerText = dict['CAMERA'];
  document.getElementById('btn-tokusho').innerText = dict['TOKUSHO_BTN'];

  const elCloseHelp = document.getElementById('btn-close-help');
  if (elCloseHelp) elCloseHelp.innerText = dict['BTN_CLOSE_SIMPLE'];

  const elSizeHeader = document.getElementById('text-size-header');
  if (elSizeHeader) elSizeHeader.innerText = dict['SIZE_HEADER'];

  const elTitle = document.getElementById('text-premium-title');
  if (elTitle) elTitle.innerText = dict['PREMIUM_TITLE'];

  const elDesc = document.getElementById('text-premium-desc');
  if (elDesc) elDesc.innerHTML = dict['PREMIUM_DESC'];

  const elWarn = document.getElementById('text-premium-warning');
  if (elWarn) elWarn.innerHTML = dict['PREMIUM_WARNING'];

  const elPurch = document.getElementById('btn-purchase');
  if (elPurch) elPurch.innerText = dict['PURCHASE'];

  const elCloseModal = document.getElementById('btn-close-modal');
  if (elCloseModal) elCloseModal.innerText = dict['CLOSE'];

  const elSaveTitle = document.getElementById('text-save-title');
  if (elSaveTitle) elSaveTitle.innerText = dict['SAVE_TITLE'];

  const elSaveDesc = document.getElementById('text-save-desc');
  if (elSaveDesc) elSaveDesc.innerText = dict['SAVE_DESC'];

  const elMainSave = document.getElementById('btn-main-save');
  if (elMainSave) elMainSave.innerText = dict['SAVE_BTN_MAIN'];

  const elCloseSave = document.getElementById('btn-close-save');
  if (elCloseSave) elCloseSave.innerText = dict['CLOSE'];

  const closeTokushoBtn = document.getElementById('btn-close-tokusho');
  if (closeTokushoBtn) closeTokushoBtn.innerText = dict['CLOSE'];
}

window.toggleRegion = () => {
  if (currentRegion === 'ja') currentRegion = 'us';
  else if (currentRegion === 'us') currentRegion = 'eu';
  else currentRegion = 'ja';

  updateUITexts();

  let newDefaultRatio;
  if (currentRegion === 'us') {
    newDefaultRatio = 11 / 8.5;
  } else {
    newDefaultRatio = 297 / 210;
  }

  isLandscape = false;
  document.getElementById('btn-rotate').classList.remove('active');

  updateShape(newDefaultRatio);
  renderButtons();
};

startCamera();
updateShape(297 / 210);
updateGridDisplay();
updateUITexts();
renderButtons();
window.addEventListener('resize', () => updateShape(currentBaseRatio));
// ★ ログイン/ユーザーアイコンを非表示に固定
if (document.getElementById('btn-login')) document.getElementById('btn-login').style.display = 'none';
if (document.getElementById('user-icon')) document.getElementById('user-icon').style.display = 'none';