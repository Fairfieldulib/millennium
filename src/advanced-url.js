//unify URLs
var advancedUrl = window.location.href;
try{
  if (advancedUrl.indexOf('~') === -1 || advancedUrl.indexOf('searchtype') !== -1 || advancedUrl.indexOf('frameset') !== -1 || advancedUrl.indexOf('save=') !== -1 || advancedUrl.indexOf('#') !== -1) {
    if ($('a:contains(date)').length !== 0 && $('a:contains(date)').text() === 'date') {
      advancedUrl = $('a:contains(date)').attr('href').replace('=DX','=D');
    } else if ($('a:contains(relevance)').length !== 0) {
      advancedUrl = $('a:contains(relevance)').attr('href').replace('=DX','=D');
    } else {
      advancedUrl = $('.media-heading').eq(0).find('a').eq(1).attr('href').match(/^(\/.+?\/.+?)\//)[1];
    }
  }
  //logged in and looking at patron view
  if (advancedUrl.indexOf('/public') !== -1) {
    advancedUrl = advancedUrl.substr(0, advancedUrl.indexOf('/X', advancedUrl.indexOf('/X') + 3));
  }
  if (advancedUrl.indexOf('/exact') !== -1) {
    var match = advancedUrl.match(/&FF=.+?&/);
    if (match) {
      advancedUrl = advancedUrl.substr(0, match.index + match[0].length - 1);
    }
  }
  if (advancedUrl.match(/\/X(?!\?)/)) {
    advancedUrl = advancedUrl.replace('/X', '/X?');
  }
} catch(e) {
  if (advancedUrl.indexOf('record=b') !== -1) {
    advancedUrl = 'search~S1/X?a&searchscope=1&SORT=D';
  }
}
console.log(advancedUrl);