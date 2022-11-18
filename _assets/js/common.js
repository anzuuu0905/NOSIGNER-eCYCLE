(function ($) {
  'use strict';

  // PC/SP判定
  // スクロールイベント
  // リサイズイベント
  // スムーズスクロール

  /* ここから */

  const breakpoint = 767;
  const mql = window.matchMedia(`screen and (max-width: ${breakpoint}px)`); //、MediaQueryListの生成
  let deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP

  let timer = null;
  // 背景画像
  const $p_fixed = $('.p-fixed');
  // request_btn
  const $request_btn = $('#request_btn');
  // $request_btn.hide();
  $request_btn.css({
    'position': 'fixed',
    'bottom': '20px',
    // 'display':'block',
    'opacity':'',
  });

  // ヘッダー追従
  if (deviceFlag === 0) {
    var mv_height = $('.p-mv').height();
    $(window).scroll(function () {
      var top = $(window).scrollTop();
      if (mv_height < top) {   
        $('.p-header').addClass('m_fixed');
      } else {
        $('.p-header').removeClass('m_fixed');
      }
    });
  }else{
    $('.p-header__menubox').addClass('m_fixed');
  }

  // スクロールイベント
  $(window).on('scroll touchmove', function () {

    // スクロール中か判定
    if (timer !== false) {
      clearTimeout(timer);
    }
    const scrollHeight = $(document).height(); //サイトの高さ
    const scrollTopPosition = $(window).scrollTop();//表示している画面の最上部の位置
    const scrollPosition = $(window).height() + $(window).scrollTop();//表示している画面の最下部の位置
    const partnerHeight = parseInt($('#partner').innerHeight()) -25;//パートナー企業の位置
    const meritHeight = $('#merit-top').offset().top; 

    const windowHeight = $(window).height(); //window高さ
    const mvHeight = windowHeight + meritHeight - scrollPosition;  //MVの高さを縮めていく
    if (scrollPosition > meritHeight){
      const meritHeight = $('#merit-top').offset().top; 
      $p_fixed.css({
        // 'opacity':'1',
        'height': mvHeight,
      });
    } else {
      $p_fixed.css({
        // 'opacity':'0',
        'height': windowHeight,
      });
    }
    
    if (scrollHeight - scrollPosition <= partnerHeight ) {
      // 現在の下から位置が、パートナーの高さの位置にはいったら
      $request_btn.css({
        // 'display':'none',
        'opacity': '0',
        'pointer-events':'none',
      });
    } else {
      $request_btn.css({
        'position': 'fixed',
        'bottom': '20px',
        // 'display':'block',
        'opacity': '1',
        'pointer-events':'auto',
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




  // タブメニュー
  $(function () {
    var headerHight = 100;
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
      var speed = 400;
      var href= $(this).attr("data-url");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top - headerHight;
      $(".p-merit__tabarea.top .js-tab").eq(index).addClass("current");
      $(".p-merit__tabarea.bottom .js-tab").eq(index).addClass("current");
      
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      $(window).focus();
      return false;
    });
  });


  // スムーズスクロール
  // #で始まるアンカーをクリックした場合にスムーススクロール
  $('a[href^="#"]').on('click', function () {
    if ($(this).parent().hasClass('js-tab')) {
      // js-tabクラスの場合は、別途処理する
    }else{
    const speed = 500;
    if(deviceFlag === 0){
      var headerHight = 100; 
    }else{
      // var headerHight = 65; 
      var headerHight = -50;
    }
    // アンカーの値取得
    const href = $(this).attr('href');
    // 移動先を取得
    const target = $(href == '#' || href == '' ? 'html' : href);
    // 移動先を数値で取得
    const position = target.offset().top - headerHight;
    // スムーススクロール
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  }
});

// ハンバーガーメニュー
  $('.js-hamburger').on('click', function () {
    if ($('.js-hamburger').hasClass('open')) {
      $('.js-drawer-menu').fadeOut();
      $('.js-overlay').fadeOut();
      $(this).removeClass('open');
      $("html").removeClass("is-fixed");  // 背景固定解除！
    } else {
      $('.js-drawer-menu').fadeIn();
      $('.js-overlay').fadeIn();
      $('.js-hamburger').addClass('open');
      $("html").addClass("is-fixed");     // 背景固定！
    }
  });

  $('.js-drawer-menu a').on('click',function() {
    $('.js-hamburger').removeClass('open');
    $('.js-overlay').fadeOut();
    $("html").removeClass("is-fixed");     // 背景固定！
  });

})(jQuery);

// モーダルアニメーション
MicroModal.init({
  disableScroll: true,
  // awaitOpenAnimation: true,
  // awaitCloseAnimation: true
});


//scroll_effect
$(window).scroll(function () {
  var scrollAnimationElm = document.querySelectorAll('.scroll_up , .scroll_left , .scroll_right, .js-imgfadein');
  var scrollAnimationFunc = function () {
    for (var i = 0; i < scrollAnimationElm.length; i++) {
      var triggerMargin = 150;
      if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
        scrollAnimationElm[i].classList.add('on');
      }
    }
  }
  window.addEventListener('load', scrollAnimationFunc);
  window.addEventListener('scroll', scrollAnimationFunc);
});
