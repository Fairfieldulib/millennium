//add bootstrap to pagination
var $pager = $('.browsePager td.browsePager').addClass('pagination');
$pager.find('strong').wrap('<a>');
$pager.contents().filter(function() {
  return (this.nodeType === 3 && this.nodeValue !== '\n');
}).wrap('<a>');
$pager.children().wrap('<li>');
$pager.find('strong').parents('li').addClass('active');