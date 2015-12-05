/**
 * グローバルナビの表示をPC, Mobileで切り替える
 * 要素をjQueryで非表示にしているため、CSSでは再表示できない。
 * そのため、下記の関数は必要。
 */
function globalNavi () {
  // window.innerWidth ではなく、各ブレークポイントでの要素の表示状態で判断する。
  // 参照: http://b.hatena.ne.jp/entry/245120894/comment/datemakio
  if ($('.toggle-menu').is(':visible')) {
    $('.globalnavi, .globalnavi > *').hide(); // スマホ向け
  } else {
    $('.globalnavi, .globalnavi > *').show(); // PC向け
  }
}

/**
 * ページ読込み後に行う処理
 */
$(function () {
  // 事前実行
  globalNavi();
  // レスポンシブ対応
  $(window).on('resize', function() {
    globalNavi();
  });

  /**
   * グローバルナビの表示切替
   * 単純なslideUp(), slideDown()ではアニメーションしない可能性がある。
   * そのため、対象の子要素にslideUp()させるなど、複雑な指定をしている。
   * 参照: 
   */
  $(document).on('click', function (ev) {
    if ($('.toggle-menu').is(':visible')) {
      ev.stopPropagation();
      $('.globalnavi > *').slideUp('fast', function () {
        $(this).parent().hide();
      });
    }
  });
  $('.toggle-menu').on('click', function (ev) {
    if ($('.globalnavi').is(':hidden')) {
      ev.stopPropagation();
      $('.globalnavi > *')
        .hide()
        .parent().show().end()
        .slideDown('fast');
    }
  });
});