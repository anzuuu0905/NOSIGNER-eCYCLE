(function ($) {
  'use strict';

  // PC/SP判定
  // スクロールイベント
  // リサイズイベント
  // スムーズスクロール

  /* ここから */

  const breakpoint = 640;
  const mql = window.matchMedia(`screen and (max-width: ${breakpoint}px)`); //、MediaQueryListの生成
  let deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP

  // request_btn
  let timer = null;
  const $request_btn = $('#request_btn');
  // $request_btn.hide();

  // スクロールイベント
  $(window).on('scroll touchmove', function () {

    // スクロール中か判定
    if (timer !== false) {
      clearTimeout(timer);
    }

    // スクロール量が100pxを超えたら、200ms後にフェードイン
    // timer = setTimeout(function () {
    //   if ($(this).scrollTop() > 100) {
    //     $('#request_btn').fadeIn('normal');
    //   } else {
    //     $request_btn.fadeOut();
    //   }
    // }, 200);

    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footHeight = parseInt($('#footer').innerHeight()) -25;
    const partnerHeight = parseInt($('#partner').innerHeight()) -25;

    if (scrollHeight - scrollPosition <= partnerHeight ) {
      // 現在の下から位置が、フッターの高さの位置にはいったら(bottom20px分を引いて調整)
      $request_btn.css({
        'display':'none',
      });
    } else {
      $request_btn.css({
        'position': 'fixed',
        'bottom': '20px',
        'display':'block',
      });
    }

  });


  // リサイズイベント
  const checkBreakPoint = function (mql) {
    deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP
    // → PC
    if (deviceFlag === 0) {
      console.log('PC');
    } else {
      // →SP
      console.log('SP');
    }

    deviceFlag = mql.matches;
  }

  // ブレイクポイントの瞬間に発火
  mql.addListener(checkBreakPoint); //MediaQueryListのchangeイベントに登録

  // 初回チェック
  checkBreakPoint(mql);


  // スムーズスクロール
  // #で始まるアンカーをクリックした場合にスムーススクロール
  $('a[href^="#"]').on('click', function () {
    const speed = 500;
    // アンカーの値取得
    const href = $(this).attr('href');
    // 移動先を取得
    const target = $(href == '#' || href == '' ? 'html' : href);
    // 移動先を数値で取得
    const position = target.offset().top;

    // スムーススクロール
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });



  // タブメニュー
  $(function () {
    // 最初のコンテンツは表示
    $(".js-content:first-of-type").css("display", "block");
    // タブをクリックすると
    $(".js-tab").on("click", function () {
      // 現在選択されているタブからcurrentを外す
      $(".current").removeClass("current");
      // クリックされたタブにcurrentクラスを付与
      // $(this).addClass("current");
      // クリックされた要素が何番目か取得（クリックしたタブのインデックス番号を取得）
      const index = $(this).index();
      // クリックしたタブのインデックス番号と同じコンテンツを表示
      $(".js-content").hide().eq(index).fadeIn(300);
      $(".p-merit__tabarea.top .js-tab").eq(index).addClass("current");
      $(".p-merit__tabarea.bottom .js-tab").eq(index).addClass("current");
    });
  });

  // ヘッダー追従
  var mv_height = $('.p-mv').height();
  $(window).scroll(function () {
    var top = $(window).scrollTop();
    if (mv_height < top) {   
      $('.p-header').addClass('m_fixed');
    } else {
      $('.p-header').removeClass('m_fixed');
    }
  });

// ハンバーガーメニュー
  $('.js-hamburger').on('click', function () {
    if ($('.js-hamburger').hasClass('open')) {
      $('.js-drawer-menu').fadeOut();
      $('.js-overlay').fadeOut();
      $(this).removeClass('open');
      // $("html").removeClass("is-fixed");  // 背景固定解除！
    } else {
      $('.js-drawer-menu').fadeIn();
      $('.js-overlay').fadeIn();
      $('.js-hamburger').addClass('open');
      // $("html").addClass("is-fixed");     // 背景固定！
    }
  });

  $('.js-drawer-menu a').on('click',function() {
    $('.js-hamburger').removeClass('open');
    $('.js-overlay').fadeOut();
  });

})(jQuery);

MicroModal.init({
  disableScroll: true,
  awaitOpenAnimation: true,
  awaitCloseAnimation: true
});