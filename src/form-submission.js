$('form[name="searchtool"], #searchCatalog').on('submit', function(e) {
  //pass through for other forms
  if (location.pathname === '/search/t' || location.search.indexOf('searchtype=t') !== -1 || location.pathname === '/search/d' || location.search.indexOf('searchtype=d') !== -1 ||
    location.pathname === '/search/a' || location.search.indexOf('searchtype=a') !== -1 || location.pathname === '/search/i' || location.search.indexOf('searchtype=i') !== -1 ||
    location.pathname === '/search/c' || location.search.indexOf('searchtype=c') !== -1 || location.pathname === '/search/r' || location.pathname === '/search/p' ||
    location.search.indexOf('searchtype=r') !== -1 || location.search.indexOf('searchtype=p') !== -1 || $('select[name="searchtype"]').val() === 'r' || $('select[name="searchtype"]').val() === 'p') {
    return true;
  }
  if (advancedUrl.indexOf('/exact') !== -1 || advancedUrl.indexOf('record=b') !== -1 || advancedUrl.indexOf('frameset') !== -1 || location.pathname === '/' || location.pathname === '/search' ||
    advancedUrl.indexOf('patroninfo') !== -1) {
    advancedUrl = '/search~S1/X?a&searchscope=1&SORT=D';
  }
  var $form = $(this);
  var formValues = $form.serializeArray();
  var values = {};
  formValues.forEach(function(input) {
    values[input.name] = input.value;
  });
  var query;
  var facet = $('#dnlFieldFacets button.dnlApplied').text() || $('#searchtype option:selected').text();
  if (facet.toLowerCase() === 'call number') {
    return true;
  }
  query = keywordQueryMod(encodeURIComponent(values.searcharg).replace(/%22/g, '"'), facet);
  advancedUrl = advancedUrl.replace(/\/X\?(.+?)&/, '\/X\?' + query + '&').replace(/\?\/X(.+?)&/, '\?\/X' + query + '&');
  if (advancedUrl.indexOf('dnlhack=true') !== -1) {
    while (advancedUrl.indexOf('&m') !== -1 || advancedUrl.indexOf('&b') !== -1) {
      advancedUrl = advancedUrl.replace(/&m=([a-zA-Z0-9])/g, '');
      advancedUrl = advancedUrl.replace(/&b=([a-zA-Z0-9]+)/g, '');
      advancedUrl = advancedUrl.replace('&dnlhack=true', '');
    }
  }
  if (values.searchscope !== '3' && values.searchscope !== '4') {
    advancedUrl = advancedUrl.replace(/searchscope=[0-9]/, 'searchscope=' + values.searchscope);
    advancedUrl = advancedUrl.replace(/search~S[0-9]/, 'search~S' + values.searchscope);
  } else {
    advancedUrl = advancedUrl.replace(/searchscope=[0-9]/, 'searchscope=1');
    advancedUrl = advancedUrl.replace(/search~S[0-9]/, 'search~S1');
    if (groups[values.searchscope].mat.length > 0) {
      advancedUrl = advancedUrl + '&m=' + groups[values.searchscope].mat.join('&m=');
    }
    if (groups[values.searchscope].loc.length > 0) {
      advancedUrl = advancedUrl + '&b=' + groups[values.searchscope].loc.join('&b=');
    }
    advancedUrl += '&dnlhack=true';
  }
  console.log(advancedUrl);
  window.location = advancedUrl;
  e.preventDefault();
});