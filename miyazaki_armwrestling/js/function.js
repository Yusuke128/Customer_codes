// スクロールさせるボタンを取得
const scroll_btns = document.querySelectorAll(".nav_link");
const header = document.querySelector("header");
// ナビメニューの場所を取得
const nav = document.querySelector("nav");

// スクロール処理(時間指定あり)
// スクロール関数
const smoothScrollTo = (target, duration) => {
  const startPosition = window.pageYOffset; // 現在のスクロール位置
  const distance = target - startPosition; // 移動距離
  let startTime = null;

  // アニメーションのループ処理
  const animationLoop = (currentTime) => {
    if (startTime === null) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;

    // イージング関数（ゆっくり始まってゆっくり終わる）
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);

    // 進捗状況を計算 (0から1)
    const progress = Math.min(timeElapsed / duration, 1);

    // イージングを適用した進捗
    const easedProgress = ease(progress);

    // スクロール位置を更新
    window.scrollTo(0, startPosition + distance * easedProgress);

    // durationが経過するまでループを続ける
    if (timeElapsed < duration) {
      requestAnimationFrame(animationLoop);
    }
  };

  // アニメーションを開始
  requestAnimationFrame(animationLoop);
};
// アクショントリガー
scroll_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); //通常のジャンプていし
    // hrefから移動先IDを取得
    const targetId = btn.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const header_height = header.getBoundingClientRect().height;
      const nav_height = nav.getBoundingClientRect().height;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - header_height - nav_height;

      // スクロール処理開始（1秒）
      smoothScrollTo(targetPosition, 1000);
    }
  });
});

// ナビメニューをヘッダーの下に固定

function Navtop() {
  const headerHeight = header.offsetHeight;
  nav.style.top = `${headerHeight}px`;
}
window.addEventListener("load", Navtop);
window.addEventListener("resize", Navtop);
