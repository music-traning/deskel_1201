import { inject } from 'https://esm.sh/@vercel/analytics';

inject();

// 言語データ
const LANGUAGE_STRINGS = {
  'ja': {
    'BTN_LABEL': '🇯🇵 Japan',
    'LOGIN': 'G ログイン',
    'IMPORT': '📁 読込',
    'CAMERA': '📷 カメラ',
    'BTN_GRID_TYPE': '▦ 構図',

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
        「📁 読込」は写真模写の練習に便利です。<br><br>
        <span style="font-size: 0.9em; color: #ddd;">※カメラは人間の目より広角です。画面を信じすぎず、最後は自分の肉眼で形のゆがみを修正してください。</span>
      </div>

      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #555; text-align: center;">
        <h4 style="margin-bottom: 8px;">🎁 開発者を応援</h4>
        <p style="font-size: 0.9em; line-height: 1.5; color: #ccc;">
          本アプリはフリーウェアですが、開発・維持にはコストがかかります。<br>
          もしよろしければご支援をお願いいたします。
        </p>
        <a href="https://ofuse.me/8bc9d230" target="_blank" rel="noopener noreferrer" 
           style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #444; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; border:1px solid #666;">
           buro を支援する (OFUSE)
        </a>

        <div style="margin-top: 25px; font-size: 0.85em; color: #888;">
          お問い合わせ: <br>
          <a href="mailto:deskel358@gmail.com" style="color: #aaa; text-decoration: underline;">
            deskel358@gmail.com
          </a>
        </div>
        </div>
      `,
  },
  'us': {
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
        Use "📁 Import" for photo reference study.<br><br>
        <span style="font-size: 0.9em; color: #ddd;">*Note: The camera lens is wider than the human eye. Do not rely solely on the screen; please correct perspective distortions with your own eyes.</span>
      </div>

      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #555; text-align: center;">
        <h4 style="margin-bottom: 8px;">🎁 Support Developer</h4>
        <p style="font-size: 0.9em; line-height: 1.5; color: #ccc;">
          This app is freeware, but development requires resources.<br>
          Your support (donation) is greatly appreciated.
        </p>
        <a href="https://ofuse.me/8bc9d230" target="_blank" rel="noopener noreferrer" 
           style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #444; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; border:1px solid #666;">
           Support buro (OFUSE)
        </a>

        <div style="margin-top: 25px; font-size: 0.85em; color: #888;">
          Contact: <br>
          <a href="mailto:deskel358@gmail.com" style="color: #aaa; text-decoration: underline;">
            deskel358@gmail.com
          </a>
        </div>
        </div>
      `,
  },
  'eu': {
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
        Use "📁 Import" for photo reference study.<br><br>
        <span style="font-size: 0.9em; color: #ddd;">*Note: The camera lens is wider than the human eye. Do not rely solely on the screen; please correct perspective distortions with your own eyes.</span>
      </div>

      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #555; text-align: center;">
        <h4 style="margin-bottom: 8px;">🎁 Support Developer</h4>
        <p style="font-size: 0.9em; line-height: 1.5; color: #ccc;">
          This app is freeware, but development requires resources.<br>
          Your support (donation) is greatly appreciated.
        </p>
        <a href="https://ofuse.me/8bc9d230" target="_blank" rel="noopener noreferrer" 
           style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #444; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; border:1px solid #666;">
           Support buro (OFUSE)
        </a>

        <div style="margin-top: 25px; font-size: 0.85em; color: #888;">
          Contact: <br>
          <a href="mailto:deskel358@gmail.com" style="color: #aaa; text-decoration: underline;">
            deskel358@gmail.com
          </a>
        </div>
        </div>
  `,
  }
};

let currentRegion = 'ja';

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

  frame.style.opacity = '1';
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

// === 保存ボタンのクリックイベント（歪み補正版） ===
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

  // ラッパー（表示領域）の論理サイズ（ズーム考慮なし）
  const displayW = wrapperRect.width / state.zoom;
  const displayH = wrapperRect.height / state.zoom;

  // 縦横独立ではなく、CSSのobject-fitに基づいた「均等スケール」と「オフセット」を計算する
  let renderScale;
  let offsetX = 0;
  let offsetY = 0;

  if (isUsingCamera) {
    // カメラ (object-fit: cover) の場合: 縦横の比率の「大きい方」に合わせて拡大
    renderScale = Math.max(displayW / naturalW, displayH / naturalH);
  } else {
    // インポート画像 (object-fit: contain) の場合: 縦横の比率の「小さい方」に合わせる
    renderScale = Math.min(displayW / naturalW, displayH / naturalH);
  }

  // 実際に画面に描画されている映像のサイズ
  const renderW = naturalW * renderScale;
  const renderH = naturalH * renderScale;

  // object-fitによるセンタリングのズレ（はみ出し分や余白）を計算
  offsetX = (renderW - displayW) / 2;
  offsetY = (renderH - displayH) / 2;

  // 画面上のグリッド位置（ラッパー左上からの相対位置）
  const relX = (frameRect.left - wrapperRect.left) / state.zoom;
  const relY = (frameRect.top - wrapperRect.top) / state.zoom;

  // グリッド位置を、元画像（naturalW/H）の座標系に変換
  // （画面上の座標 + センタリングのズレ）÷ 描画スケール = 元画像の座標
  const sourceX = (relX + offsetX) / renderScale;
  const sourceY = (relY + offsetY) / renderScale;
  const sourceW = (frameRect.width / state.zoom) / renderScale;
  const sourceH = (frameRect.height / state.zoom) / renderScale;

  // キャンバスサイズ設定
  canvas.width = sourceW;
  canvas.height = sourceH;

  // 画像描画
  ctx.drawImage(sourceElem, sourceX, sourceY, sourceW, sourceH, 0, 0, sourceW, sourceH);

  // グリッド描画設定
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--grid-color').trim();
  // 線の太さを画像サイズに合わせて調整 (0.3%)
  ctx.lineWidth = Math.min(sourceW, sourceH) * 0.003;

  // グリッド線の描画ロジック
  if (state.gridType === 0) { // 4x4
    for (let i = 1; i <= 3; i++) {
      const p = i * (sourceW / 4);
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, sourceH); ctx.stroke();
      const q = i * (sourceH / 4);
      ctx.beginPath(); ctx.moveTo(0, q); ctx.lineTo(sourceW, q); ctx.stroke();
    }
  } else if (state.gridType === 1) { // 3x3
    for (let i = 1; i <= 2; i++) {
      const p = i * (sourceW / 3);
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, sourceH); ctx.stroke();
      const q = i * (sourceH / 3);
      ctx.beginPath(); ctx.moveTo(0, q); ctx.lineTo(sourceW, q); ctx.stroke();
    }
  } else { // Cross
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sourceW, sourceH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sourceW, 0); ctx.lineTo(0, sourceH); ctx.stroke();
  }
  ctx.strokeRect(0, 0, sourceW, sourceH);

  // 以下、保存モーダル表示処理
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

    btn.innerText = label;

    btn.onclick = () => {
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