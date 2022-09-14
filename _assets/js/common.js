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

  // pagetop
  let timer = null;
  const $pageTop = $('#pagetop');
  $pageTop.hide();

  // スクロールイベント
  $(window).on('scroll touchmove', function () {

    // スクロール中か判定
    if (timer !== false) {
      clearTimeout(timer);
    }

    // スクロール量が100pxを超えたら、200ms後にフェードイン
    timer = setTimeout(function () {
      if ($(this).scrollTop() > 100) {
        $('#pagetop').fadeIn('normal');
      } else {
        $pageTop.fadeOut();
      }
    }, 200);

    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footHeight = parseInt($('#footer').innerHeight());


    if (scrollHeight - scrollPosition <= footHeight - 20) {
      // 現在の下から位置が、フッターの高さの位置にはいったら(bottom20px分を引いて調整)
      $pageTop.css({
        'position': 'absolute',
        'bottom': footHeight,
      });
    } else {
      $pageTop.css({
        'position': 'fixed',
        'bottom': '20px'
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





// // タブメニュー
// $(function () {
//   // 最初のコンテンツは表示
//   $(".js-content:first-of-type").css("display", "block");
//   // タブをクリックすると
//   $(".js-tab").on("click", function () {
//     // 現在選択されているタブからcurrentを外す
//     $(".current").removeClass("current");
//     // クリックされたタブにcurrentクラスを付与
//     $(this).addClass("current");
//     // クリックされた要素が何番目か取得（クリックしたタブのインデックス番号を取得）
//     const index = $(this).index();
//     // クリックしたタブのインデックス番号と同じコンテンツを表示
//     $(".js-content").hide().eq(index).fadeIn(300);
//   });
// });








$(function() {

  var tabMenu = function() {

    /**
     * 変数の指定
     * $tab_area          : tabの親要素のjQueryオブジェクト
     * $content           : tabによって切り替わる要素のjQueryオブジェクト
     * TAB_ACTIVE_CLASS   : tabが選択されたスタイルを変更するclass名
     * CONTENT_SHOW_CLASS : contentを表示させるためのclass名
     * id_arr             : $contentのIDを配列に格納
     */
    var $tab_area          = $('.tabArea');
    var $content           = $('.contents .tab_main');
    var TAB_ACTIVE_CLASS   = 'select';
    var CONTENT_SHOW_CLASS = 'is_show';
    var id_arr             = $content.map(function() { return '#' + $(this).attr('id');}).get();

    /**
     * 該当するhashデータがある場合、hashを返す
     * 該当とは id_arr[] に含まれるもの
     * @return {string} 該当する場合
     * @return {false} 該当しない（存在しない）場合
     */
    var getHash = function() {
      var hash = window.location.hash;
      var index = id_arr.indexOf(hash);

      if (index === -1) {
        return false;
      } else {
        return id_arr[index];
      }
    };

    /**
     * ページ読み込み時に実行
     * 1. hashがあれば、hashをhrefに持つタブのスタイル変更（専用のclass付与）
     * 2. hashがあれば、hashをidに持つコンテンツを表示（専用のclassを付与）
     * 3. hashがなければ、タブの先頭が選択された状態とする
     */
    var initialize = function() {
      var hash = getHash();
      if (hash) {
        $tab_area.find('a[href="'+hash+'"]').addClass(TAB_ACTIVE_CLASS); // 1
        $(hash).addClass(CONTENT_SHOW_CLASS); // 2
        $(window).on('load',function(){
          setTimeout(function(){
            // 移動先を100px上にずらす
            var adjust = 100;
            // スクロールの速度
            var speed = 400; // ミリ秒
            // 移動先を取得
            var target = $(hash);
            // 移動先を調整
            var position = target.offset().top - adjust;
            // スムーススクロール
            $('body,html').animate({scrollTop:position}, speed, 'swing');
          },100);
        });
      } else {
        $tab_area.find('.one_tab:first > a').addClass(TAB_ACTIVE_CLASS); // 3
        $($content[0]).addClass(CONTENT_SHOW_CLASS); // 3
      }
    };

    /**
     * タブのクリックイベント
     * 1. クリックされたタブのhref, 該当するcontentを取得
     * 2. 既にクリック済みの状態であればスキップ
     * 3. 一旦タブ・contentの専用classを全削除
     * 4. クリックしたタブのスタイルを変更、該当するcontentを表示（それぞれ専用のclassを付与）
     */
    var addEvent = function() {
      $tab_area.find('a').on('click', function() {
        // 1
        var href = $(this).attr('href');
        var $targetContent = $(href);

        // 2
        if ($(this).hasClass(TAB_ACTIVE_CLASS)) {
          return false;
        }

        // 3
        $tab_area.find('a').removeClass(TAB_ACTIVE_CLASS);
        $content.removeClass(CONTENT_SHOW_CLASS);

        // 4
        $(this).addClass(TAB_ACTIVE_CLASS);
        $targetContent.addClass(CONTENT_SHOW_CLASS);

        return false;
      });
    };

    return [initialize(), addEvent()];
  };

  // 実行
  tabMenu();
});

// 下のタブをクリックした場合に処理
$(function(){
  $('.tabArea.bottom a[href^=#]').click(function() {
    // 移動先を100px上にずらす
    var adjust = 100;
    // スクロールの速度
    var speed = 400; // ミリ秒
    // アンカーの値取得
    var href= $(this).attr("href");
    // 移動先を取得
    var target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を数値で取得
    var position = target.offset().top - adjust;
    // スムーススクロール
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});

// タブ連動
$(function(){
  // tab01
  $('.tabArea .one_tab:nth-child(1) a').on('click',function(){
    $('.tabArea .one_tab:nth-child(1) a').addClass('select');
  });
  $('.tabArea .one_tab:not(:nth-child(1)) a').on('click',function(){
    $('.tabArea .one_tab:nth-child(1) a').removeClass('select');
  });
  // tab02
  $('.tabArea .one_tab:nth-child(2) a').on('click',function(){
    $('.tabArea .one_tab:nth-child(2) a').addClass('select');
  });
  $('.tabArea .one_tab:not(:nth-child(2)) a').on('click',function(){
    $('.tabArea .one_tab:nth-child(2) a').removeClass('select');
  });
  // tab03
  $('.tabArea .one_tab:nth-child(3) a').on('click',function(){
    $('.tabArea .one_tab:nth-child(3) a').addClass('select');
  });
  $('.tabArea .one_tab:not(:nth-child(3)) a').on('click',function(){
    $('.tabArea .one_tab:nth-child(3) a').removeClass('select');
  });
});





})(jQuery);