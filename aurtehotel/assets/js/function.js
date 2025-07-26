//ハンバーガーメニュー
const hum = document.querySelector(".humberger");
const header = document.querySelector("header");
const body = document.body;
const navLinks = document.querySelectorAll(".nav_link");

if (hum) {
  hum.addEventListener("click", () => {
    header.classList.toggle("open");
    body.classList.toggle("no-scroll");
  });
}

// SP版でナビリンククリック時にメニューを閉じる
// foreachで全てに適用させる
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    // headerにopenがあるかどうか判定
    if (header.classList.contains("open")) {
      header.classList.remove("open");
      body.classList.remove("no-scroll");
    }
  });
});

// スクロール処理(時間指定あり)
// スクロールさせるボタンを取得
const scroll_btn = document.querySelector(".sp_scroll");

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
scroll_btn.addEventListener("click", () => {
  // ヘッダーの高さを取得
  const header_height = header.getBoundingClientRect().height;
  // スクロールする高さを計算
  const scroll_heigh = window.innerHeight - header_height;
  // スクロール処理
  smoothScrollTo(scroll_heigh, 1000);
});

// ふわっと出てくるアニメーション
// 1. 監視対象の要素をすべて取得
const animationTargets = document.querySelectorAll(".card_box ,.future");

// Intersection Observerのオプション
const animation_option = {
  root: null,
  rootMargin: "0px 0px -20% 0px", // 画面下から20%見えたら発動
  threshold: 0,
};

// Intersection Observerのコールバック関数
const animationCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // 要素が交差領域に入ったか判定
    if (entry.isIntersecting) {
      // is-visibleクラスを追加
      entry.target.classList.add("is-visible");
      // 一度表示したら監視を解除
      observer.unobserve(entry.target);
    }
  });
};

// Intersection Observerのインスタンスを作成
const animationObserver = new IntersectionObserver(animationCallback, animation_option);

// 各監視対象要素をObserverに登録
animationTargets.forEach((target) => {
  animationObserver.observe(target);
});
