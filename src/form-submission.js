$('form[name="searchtool"], #searchCatalog').on('submit', function(e) {
  //pass through for other forms
  if (location.pathname === '/search/t' || location.search.indexOf('searchtype=t') !== -1 || location.pathname === '/search/d' || location.search.indexOf('searchtype=d') !== -1 ||
    location.pathname === '/search/a' || location.search.indexOf('searchtype=a') !== -1 || location.pathname === '/search/i' || location.search.indexOf('searchtype=i') !== -1 ||
    location.pathname === '/search/c' || location.search.indexOf('searchtype=c') !== -1) {
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
  query = keywordQueryMod(values.searcharg, facet);
  advancedUrl = advancedUrl.replace(/\/X\?(.+?)&/, '\/X\?' + query + '&').replace(/\?\/X(.+?)&/, '\?\/X' + query + '&');
  advancedUrl = advancedUrl.replace(/searchscope=[0-9]/, 'searchscope=' + values.searchscope);
  advancedUrl = advancedUrl.replace(/search~S[0-9]/, 'search~S' + values.searchscope);
  console.log(advancedUrl);
  window.location = advancedUrl;
  e.preventDefault();
});