import { inject } from 'https://esm.sh/@vercel/analytics';

/**
 * Deskel Pro Application
 * リファクタリング版 (v4.2)
 * 
 * 変更点:
 * - パフォーマンス最適化 (Resize Debounce)
 * - アクセシビリティ向上 (ARIA attributes)
 * - エンコーディング修正 (UTF-8)
 * - ローディングスピナーの追加
 */

// === 定数定義 ===
const CONSTANTS = {
  GRID_TYPES: ['grid-4x4', 'grid-3x3', 'grid-cross'],
  GRID_COLORS: ['rgba(255, 255, 255, 0.9)', 'rgba(0, 0, 0, 0.8)', '#ff0000', '#00ff00', '#00ffff'],
  RATIO_DATA: [
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
  ]
};

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
    'SIZE_EU_FIG': 'Europe Figure',
    'CLOSE': 'キャンセル',
    'MSG_CAMERA_STARTING': 'カメラを起動中... / Starting Camera...',
    'ERR_CAMERA_NOT_ALLOWED': 'カメラへのアクセスが拒否されました。\nブラウザの設定から許可してください。\n(Camera access denied. Please allow access in browser settings.)',
    'ERR_CAMERA_NOT_FOUND': 'カメラが見つかりません。\nデバイスにカメラが接続されているか確認してください。\n(Camera not found. Please check if the device is connected.)',
    'ERR_CAMERA_NOT_READABLE': 'カメラが他のアプリで使用中です。\n他のアプリを閉じてから再試行してください。\n(Camera is in use by another app. Please close other apps and try again.)',
    'ERR_CAMERA_OVERCONSTRAINED': 'カメラの設定が対応していません。\n(Camera settings are not supported.)',
    'ERR_CAMERA_SECURITY': 'セキュリティエラー。HTTPSで接続してください。\n(Security Error. Please connect via HTTPS.)',
    'ERR_CAMERA_DEFAULT': 'カメラの起動に失敗しました。\nページを再読み込みしてください。\n(Failed to start camera. Please reload the page.)',
    'LABEL_SIZE_DEFAULT': 'サイズ',
    'ACTION_LOAD_IMAGE': '画像を読み込む / Load Image',
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
    'SIZE_EU_FIG': 'Europe Figure',
    'CLOSE': 'Cancel',
    'MSG_CAMERA_STARTING': 'Starting Camera...',
    'ERR_CAMERA_NOT_ALLOWED': 'Camera access denied.\nPlease allow access in browser settings.',
    'ERR_CAMERA_NOT_FOUND': 'Camera not found.\nPlease check if the device is connected.',
    'ERR_CAMERA_NOT_READABLE': 'Camera is in use by another app.\nPlease close other apps and try again.',
    'ERR_CAMERA_OVERCONSTRAINED': 'Camera settings are not supported.',
    'ERR_CAMERA_SECURITY': 'Security Error. Please connect via HTTPS.',
    'ERR_CAMERA_DEFAULT': 'Failed to start camera.\nPlease reload the page.',
    'LABEL_SIZE_DEFAULT': 'Size',
    'ACTION_LOAD_IMAGE': 'Load Image',
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
    'SIZE_EU_FIG': 'Europe Figure',
    'CLOSE': 'Cancel',
    'MSG_CAMERA_STARTING': 'Starting Camera...',
    'ERR_CAMERA_NOT_ALLOWED': 'Camera access denied.\nPlease allow access in browser settings.',
    'ERR_CAMERA_NOT_FOUND': 'Camera not found.\nPlease check if the device is connected.',
    'ERR_CAMERA_NOT_READABLE': 'Camera is in use by another app.\nPlease close other apps and try again.',
    'ERR_CAMERA_OVERCONSTRAINED': 'Camera settings are not supported.',
    'ERR_CAMERA_SECURITY': 'Security Error. Please connect via HTTPS.',
    'ERR_CAMERA_DEFAULT': 'Failed to start camera.\nPlease reload the page.',
    'LABEL_SIZE_DEFAULT': 'Size',
    'ACTION_LOAD_IMAGE': 'Load Image',
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

/**
 * アプリケーションのメインクラス
 */
class DeskelApp {
  constructor() {
    // 状態の初期化
    this.state = {
      zoom: 1.0,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      startDist: 0,
      startZoom: 1.0,
      startX: 0,
      startY: 0,
      gridType: 0,
      gridColorIdx: 0,
      currentBaseRatio: 297 / 210,
      isLandscape: false,
      isUsingCamera: true,
      isImmersive: false,
      currentRegion: 'ja'
    };

    // DOM要素のキャッシュ用
    this.dom = {};
  }

  /**
   * ログ出力ヘルパー
   * @param {string} message 
   * @param {string} level 
   */
  log(message, level = 'INFO') {
    const timestamp = new Date().toLocaleTimeString('ja-JP');
    console.log(`[${timestamp}] [${level}] ${message}`);
  }

  /**
   * デバウンス関数
   * @param {Function} func 
   * @param {number} wait 
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * アプリの初期化
   */
  async init() {
    this.log("アプリの初期化を開始します...");

    try {
      inject(); // Analytics
    } catch (e) {
      this.log("Analyticsの初期化に失敗しました", "WARN");
    }

    this.cacheDOM();
    this.bindEvents();

    // 初期状態の適用
    await this.startCamera();
    this.updateShape(this.state.currentBaseRatio);
    this.updateGridDisplay();
    this.updateUITexts();
    this.renderButtons();

    // オンボーディングの確認
    if (!localStorage.getItem('deskel_intro_done_v3')) {
      if (this.dom['onboarding-overlay']) this.dom['onboarding-overlay'].style.display = 'flex';
      this.log("オンボーディングを表示しました");
    }

    // ロード完了アニメーション
    setTimeout(() => {
      if (this.dom['guide-frame']) this.dom['guide-frame'].classList.add('loaded');
    }, 100);

    this.log("アプリの初期化が完了しました。準備OKです。");
  }

  /**
   * DOM要素をキャッシュする
   */
  cacheDOM() {
    const ids = [
      'camera-video', 'imported-image', 'guide-frame', 'transform-wrapper',
      'zoom-slider', 'touch-area', 'btn-toggle-ui', 'onboarding-overlay',
      'btn-import', 'file-input', 'btn-camera', 'shutter-btn', 'photo-canvas',
      'save-modal', 'preview-img', 'btn-main-save', 'size-panel', 'help-modal',
      'text-help-title', 'help-content-area', 'panel-grid-container',
      'current-size-label', 'btn-rotate', 'overlay-layer', 'btn-lang',
      'btn-grid-type', 'btn-grid-color', 'btn-open-size-panel',
      'btn-close-save', 'btn-close-help', 'btn-help', 'main-ui', 'top-bar',
      'text-size-header', 'text-save-title', 'text-save-desc'
    ];

    ids.forEach(id => {
      this.dom[id] = document.getElementById(id);
      if (!this.dom[id]) this.log(`DOM要素が見つかりません: ${id}`, 'WARN');
    });

    // クラス指定の要素
    this.dom.closeSizePanelBtns = document.querySelectorAll('.panel-close-btn');
  }

  /**
   * イベントリスナーの設定
   */
  bindEvents() {
    // UI操作系
    this.dom['btn-toggle-ui']?.addEventListener('click', () => this.toggleImmersiveMode());
    this.dom['btn-help']?.addEventListener('click', () => this.openHelp());
    this.dom['btn-lang']?.addEventListener('click', () => this.toggleRegion());
    this.dom['btn-grid-type']?.addEventListener('click', () => this.toggleGridType());
    this.dom['btn-grid-color']?.addEventListener('click', () => this.toggleGridColor());
    this.dom['btn-rotate']?.addEventListener('click', () => this.toggleOrientation());
    this.dom['btn-open-size-panel']?.addEventListener('click', () => this.openSizePanel());

    // モーダル閉じる系
    this.dom['btn-close-save']?.addEventListener('click', () => this.closeSaveModal());
    this.dom['btn-close-help']?.addEventListener('click', () => this.closeHelp());
    this.dom.closeSizePanelBtns.forEach(btn => {
      btn.addEventListener('click', () => this.closeSizePanel());
    });

    // オンボーディング
    const startBtn = this.dom['onboarding-overlay']?.querySelector('.ob-btn-start');
    startBtn?.addEventListener('click', () => this.closeOnboarding());

    // カメラ・画像系
    this.dom['btn-camera']?.addEventListener('click', () => this.startCamera());
    this.dom['btn-import']?.addEventListener('click', () => this.dom['file-input'].click());
    this.dom['file-input']?.addEventListener('change', (e) => this.handleFileSelect(e));
    this.dom['shutter-btn']?.addEventListener('click', () => this.saveImage());

    // タッチ・ズーム操作
    const touchArea = this.dom['touch-area'];
    if (touchArea) {
      touchArea.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
      touchArea.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
      touchArea.addEventListener('touchend', () => this.handleTouchEnd());
    }

    // スライダー
    this.dom['zoom-slider']?.addEventListener('input', (e) => {
      this.state.zoom = parseFloat(e.target.value);
      this.updateTransform();
    });

    // リサイズ (デバウンス適用)
    const debouncedResize = this.debounce(() => {
      this.updateShape(this.state.currentBaseRatio);
    }, 150);
    window.addEventListener('resize', debouncedResize);
  }

  // === 機能メソッド ===

  toggleImmersiveMode() {
    this.state.isImmersive = !this.state.isImmersive;
    document.body.classList.toggle('immersive-mode', this.state.isImmersive);
    if (this.dom['btn-toggle-ui']) {
      this.dom['btn-toggle-ui'].innerText = this.state.isImmersive ? '❌' : '👁️';
    }
    this.log(`没入モード: ${this.state.isImmersive ? 'ON' : 'OFF'}`);
  }

  closeOnboarding() {
    this.dom['onboarding-overlay'].style.display = 'none';
    localStorage.setItem('deskel_intro_done_v3', 'true');
    this.log("オンボーディングを終了しました");
  }

  toggleGridType() {
    this.state.gridType = (this.state.gridType + 1) % CONSTANTS.GRID_TYPES.length;
    this.updateGridDisplay();
    if (navigator.vibrate) navigator.vibrate(30);
    this.log(`グリッドタイプ変更: ${this.state.gridType}`);
  }

  updateGridDisplay() {
    const frame = this.dom['guide-frame'];
    if (!frame) return;

    CONSTANTS.GRID_TYPES.forEach(type => frame.classList.remove(type));
    frame.classList.add(CONSTANTS.GRID_TYPES[this.state.gridType]);
    frame.innerHTML = '';

    if (this.state.gridType === 0) { // 4x4
      for (let i = 1; i <= 3; i++) {
        frame.innerHTML += `<div class="grid-line grid-line-v v${i}"></div>`;
        frame.innerHTML += `<div class="grid-line grid-line-h h${i}"></div>`;
      }
    } else if (this.state.gridType === 1) { // 3x3
      for (let i = 1; i <= 2; i++) {
        frame.innerHTML += `<div class="grid-line grid-line-v v${i}"></div>`;
        frame.innerHTML += `<div class="grid-line grid-line-h h${i}"></div>`;
      }
    } else { // Cross
      frame.innerHTML = `<svg><line x1="0" y1="0" x2="100%" y2="100%" /><line x1="100%" y1="0" x2="0" y2="100%" /></svg>`;
    }
  }

  toggleGridColor() {
    this.state.gridColorIdx = (this.state.gridColorIdx + 1) % CONSTANTS.GRID_COLORS.length;
    document.documentElement.style.setProperty('--grid-color', CONSTANTS.GRID_COLORS[this.state.gridColorIdx]);
    this.log(`グリッド色変更: ${CONSTANTS.GRID_COLORS[this.state.gridColorIdx]}`);
  }

  toggleOrientation() {
    this.state.isLandscape = !this.state.isLandscape;
    this.dom['btn-rotate'].classList.toggle('active', this.state.isLandscape);
    this.updateShape(this.state.currentBaseRatio);
    this.log(`画面回転: ${this.state.isLandscape ? '横' : '縦'}`);
  }

  updateShape(baseRatio) {
    this.state.currentBaseRatio = baseRatio;
    const effectiveRatio = this.state.isLandscape ? (1 / baseRatio) : baseRatio;

    const sw = window.innerWidth;
    const sh = window.innerHeight;
    const safeHeight = sh - 60 - 240; // UI領域を考慮

    let w = sw * 0.9;
    let h = w * effectiveRatio;

    if (h > safeHeight) { h = safeHeight; w = h / effectiveRatio; }
    if (w > sw * 0.95) { w = sw * 0.95; h = w * effectiveRatio; }

    const frame = this.dom['guide-frame'];
    frame.style.width = w + 'px';
    frame.style.height = h + 'px';

    const topOffset = 60 + (safeHeight - h) / 2;
    this.dom['overlay-layer'].style.top = topOffset + 'px';
    this.dom['overlay-layer'].style.height = safeHeight + 'px';

    frame.style.opacity = '1';
  }

  updateTransform() {
    const scale = `scale(${this.state.zoom})`;
    const translate = `translate(${this.state.translateX}px, ${this.state.translateY}px)`;
    this.dom['transform-wrapper'].style.transform = `${translate} ${scale}`;
    this.dom['zoom-slider'].value = this.state.zoom;
  }

  handleTouchStart(e) {
    if (e.touches.length === 2) {
      this.state.startDist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      this.state.startZoom = this.state.zoom;
    } else if (e.touches.length === 1 && !this.state.isUsingCamera) {
      this.state.isDragging = true;
      this.state.startX = e.touches[0].pageX - this.state.translateX;
      this.state.startY = e.touches[0].pageY - this.state.translateY;
    }
  }

  handleTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      if (this.state.startDist > 0) {
        const scale = (dist / this.state.startDist) * this.state.startZoom;
        this.state.zoom = Math.min(Math.max(scale, 1.0), 5.0);
        this.updateTransform();
      }
    } else if (e.touches.length === 1 && this.state.isDragging) {
      e.preventDefault();
      this.state.translateX = e.touches[0].pageX - this.state.startX;
      this.state.translateY = e.touches[0].pageY - this.state.startY;
      this.updateTransform();
    }
  }

  handleTouchEnd() {
    this.state.isDragging = false;
    this.state.startDist = 0;
  }

  async startCamera() {
    const dict = LANGUAGE_STRINGS[this.state.currentRegion];
    this.showLoading(dict['MSG_CAMERA_STARTING']);
    this.log("カメラを起動中...");
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: false
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = this.dom['camera-video'];
      video.srcObject = stream;
      video.style.display = 'block';
      this.dom['imported-image'].style.display = 'none';
      this.state.isUsingCamera = true;
      this.resetTransform();
      this.hideLoading();
      this.log("カメラ起動成功");

    } catch (e) {
      this.hideLoading();
      this.log(`カメラエラー: ${e.name} - ${e.message}`, "ERROR");

      // エラー種別によるメッセージ分岐
      const errorMessages = {
        'NotAllowedError': dict['ERR_CAMERA_NOT_ALLOWED'],
        'NotFoundError': dict['ERR_CAMERA_NOT_FOUND'],
        'NotReadableError': dict['ERR_CAMERA_NOT_READABLE'],
        'OverconstrainedError': dict['ERR_CAMERA_OVERCONSTRAINED'],
        'SecurityError': dict['ERR_CAMERA_SECURITY']
      };

      const message = errorMessages[e.name] || dict['ERR_CAMERA_DEFAULT'];

      this.showToast(message, 'error', {
        duration: 5000,
        action: {
          label: dict['ACTION_LOAD_IMAGE'],
          onClick: () => this.dom['file-input'].click()
        }
      });
    }
  }

  /**
   * トースト通知を表示
   * @param {string} message 
   * @param {string} type - 'success' | 'error' | 'info'
   * @param {Object} options 
   */
  showToast(message, type = 'info', options = {}) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // ARIA属性を追加
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
      <div class="toast-content">
        <p>${message}</p>
        ${options.action ? `
          <button class="toast-action" aria-label="${options.action.label}">${options.action.label}</button>
        ` : ''}
      </div>
    `;

    document.body.appendChild(toast);

    if (options.action) {
      toast.querySelector('.toast-action').onclick = () => {
        options.action.onClick();
        toast.remove();
      };
    }

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, options.duration || 3000);
  }

  showLoading(message = 'Loading...') {
    const spinner = document.createElement('div');
    spinner.id = 'loading-spinner';
    spinner.innerHTML = `
      <div class="spinner-overlay">
        <div class="spinner"></div>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(spinner);
  }

  hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.remove();
  }

  handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    this.log(`画像読み込み: ${file.name}`);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const img = this.dom['imported-image'];
      img.src = evt.target.result;
      img.style.display = 'block';

      const video = this.dom['camera-video'];
      video.style.display = 'none';
      if (video.srcObject) video.srcObject.getTracks().forEach(t => t.stop());

      this.state.isUsingCamera = false;
      this.resetTransform();
      this.log("画像表示完了");
    };
    reader.readAsDataURL(file);
  }

  resetTransform() {
    this.state.zoom = 1.0;
    this.state.translateX = 0;
    this.state.translateY = 0;
    this.updateTransform();
  }

  saveImage() {
    this.log("画像保存処理を開始...");
    if (navigator.vibrate) navigator.vibrate(50);

    const canvas = this.dom['photo-canvas'];
    const ctx = canvas.getContext('2d');
    const frame = this.dom['guide-frame'];
    const wrapper = this.dom['transform-wrapper'];

    const frameRect = frame.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const video = this.dom['camera-video'];
    const img = this.dom['imported-image'];

    let sourceElem = this.state.isUsingCamera ? video : img;
    let naturalW = this.state.isUsingCamera ? video.videoWidth : img.naturalWidth;
    let naturalH = this.state.isUsingCamera ? video.videoHeight : img.naturalHeight;

    if (!naturalW || !naturalH) {
      this.log("ソース画像のサイズが取得できません", "ERROR");
      return;
    }

    // 描画ロジック（歪み補正・グリッド描画）
    const displayW = wrapperRect.width / this.state.zoom;
    const displayH = wrapperRect.height / this.state.zoom;

    let renderScale;
    let offsetX = 0;
    let offsetY = 0;

    if (this.state.isUsingCamera) {
      renderScale = Math.max(displayW / naturalW, displayH / naturalH);
    } else {
      renderScale = Math.min(displayW / naturalW, displayH / naturalH);
    }

    const renderW = naturalW * renderScale;
    const renderH = naturalH * renderScale;

    offsetX = (renderW - displayW) / 2;
    offsetY = (renderH - displayH) / 2;

    const relX = (frameRect.left - wrapperRect.left) / this.state.zoom;
    const relY = (frameRect.top - wrapperRect.top) / this.state.zoom;

    const sourceX = (relX + offsetX) / renderScale;
    const sourceY = (relY + offsetY) / renderScale;
    const sourceW = (frameRect.width / this.state.zoom) / renderScale;
    const sourceH = (frameRect.height / this.state.zoom) / renderScale;

    canvas.width = sourceW;
    canvas.height = sourceH;

    ctx.drawImage(sourceElem, sourceX, sourceY, sourceW, sourceH, 0, 0, sourceW, sourceH);

    // グリッド描画
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--grid-color').trim();
    ctx.lineWidth = Math.min(sourceW, sourceH) * 0.003;

    if (this.state.gridType === 0) { // 4x4
      for (let i = 1; i <= 3; i++) {
        const p = i * (sourceW / 4);
        ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, sourceH); ctx.stroke();
        const q = i * (sourceH / 4);
        ctx.beginPath(); ctx.moveTo(0, q); ctx.lineTo(sourceW, q); ctx.stroke();
      }
    } else if (this.state.gridType === 1) { // 3x3
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

    // モーダル表示
    const dataURL = canvas.toDataURL('image/png');
    this.dom['preview-img'].src = dataURL;

    const btnSave = this.dom['btn-main-save'];
    btnSave.innerText = LANGUAGE_STRINGS[this.state.currentRegion]['SAVE_BTN_MAIN'];

    // イベントリスナーの重複登録を防ぐため、新しい要素に置換するか、onclickプロパティを使用する
    // ここではシンプルにonclickプロパティを上書きする
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
        this.log("画像を共有/保存しました");
      } catch (err) {
        this.log(`保存エラー: ${err.message}`, "ERROR");
      }
    };

    this.dom['save-modal'].style.display = 'flex';
    this.log("保存モーダルを表示");
  }

  openSizePanel() {
    this.dom['size-panel'].classList.add('open');
  }

  closeSizePanel() {
    this.dom['size-panel'].classList.remove('open');
  }

  openHelp() {
    const dict = LANGUAGE_STRINGS[this.state.currentRegion];
    this.dom['text-help-title'].innerText = dict['HELP_TITLE'];
    this.dom['help-content-area'].innerHTML = dict['HELP_CONTENT'];
    this.dom['help-modal'].style.display = 'flex';
  }

  closeHelp() {
    this.dom['help-modal'].style.display = 'none';
  }

  closeSaveModal() {
    this.dom['save-modal'].style.display = 'none';
  }

  renderButtons() {
    const panelGrid = this.dom['panel-grid-container'];
    panelGrid.innerHTML = '';

    const currentItem = CONSTANTS.RATIO_DATA.find(item => Math.abs(item.ratio - this.state.currentBaseRatio) < 0.001);
    if (currentItem) {
      this.dom['current-size-label'].innerText = LANGUAGE_STRINGS[this.state.currentRegion][currentItem.label_key] || LANGUAGE_STRINGS[this.state.currentRegion]['LABEL_SIZE_DEFAULT'];
    }

    CONSTANTS.RATIO_DATA.forEach(item => {
      if (!item.regions.includes(this.state.currentRegion)) return;
      const btn = document.createElement('button');
      btn.className = 'panel-size-btn';

      if (Math.abs(item.ratio - this.state.currentBaseRatio) < 0.001) btn.classList.add('active');

      let label = LANGUAGE_STRINGS[this.state.currentRegion][item.label_key] || item.id;
      btn.innerText = label;

      btn.onclick = () => {
        document.querySelectorAll('.panel-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.isLandscape = false;
        this.dom['btn-rotate'].classList.remove('active');
        this.updateShape(item.ratio);
        this.dom['current-size-label'].innerText = btn.innerText;
        this.closeSizePanel();
        this.log(`サイズ変更: ${label}`);
      };
      panelGrid.appendChild(btn);
    });
  }

  updateUITexts() {
    const dict = LANGUAGE_STRINGS[this.state.currentRegion];

    // Helper to safely set text
    const setText = (id, text) => {
      if (this.dom[id]) this.dom[id].innerText = text;
    };
    const setHTML = (id, html) => {
      if (this.dom[id]) this.dom[id].innerHTML = html;
    };

    setText('btn-lang', dict['BTN_LABEL']);
    setText('btn-import', dict['IMPORT']);
    setText('btn-camera', dict['CAMERA']);
    setText('btn-close-help', dict['BTN_CLOSE_SIMPLE']);
    setText('text-size-header', dict['SIZE_HEADER']);
    setText('text-save-title', dict['SAVE_TITLE']);
    setText('text-save-desc', dict['SAVE_DESC']);
    setText('btn-main-save', dict['SAVE_BTN_MAIN']);
    setText('btn-close-save', dict['CLOSE']);

    // Close buttons in modals might share classes or IDs, handled generically above or here if specific IDs exist
    const closeTokusho = document.getElementById('btn-close-tokusho');
    if (closeTokusho) closeTokusho.innerText = dict['CLOSE'];
  }

  toggleRegion() {
    if (this.state.currentRegion === 'ja') this.state.currentRegion = 'us';
    else if (this.state.currentRegion === 'us') this.state.currentRegion = 'eu';
    else this.state.currentRegion = 'ja';

    this.updateUITexts();

    let newDefaultRatio;
    if (this.state.currentRegion === 'us') {
      newDefaultRatio = 11 / 8.5;
    } else {
      newDefaultRatio = 297 / 210;
    }

    this.state.isLandscape = false;
    this.dom['btn-rotate'].classList.remove('active');

    this.updateShape(newDefaultRatio);
    this.renderButtons();
    this.log(`地域変更: ${this.state.currentRegion}`);
  }
}

// === アプリ起動 ===
document.addEventListener('DOMContentLoaded', () => {
  window.app = new DeskelApp();
  window.app.init();
});
