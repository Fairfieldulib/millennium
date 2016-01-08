//Reset scope to 1 for every page, so next search doesn't break
createCookie('SESSION_SCOPE', 1);


//keep logged in
$(document).ready(function() {
  if (window.location.href.indexOf('patroninfo') > 0 && (window.location.href.indexOf('top') > 0 || window.location.href.indexOf('mylists') > 0)) {
    setCookie('account', window.location.href, null, '/');
  }
  if (readCookie('account')) {
    $('a[href$="/patroninfo"]').attr('href', readCookie('account'));
  }
});