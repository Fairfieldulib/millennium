//track facet usage
$('body').on('click', '.facets ul a', function(e) {
    var $link = $(e.currentTarget);
    var text = $link.contents().filter(function() {
      return this.nodeType === 3;
    })[0].nodeValue;
    if (ga.hasOwnProperty('loaded') && ga.loaded === true) {
      ga('send', 'event', 'facet', 'click', text, {hitCallback: function() {
        document.location = $link.attr('href');
      }});
    } else {
      document.location = $link.attr('href');
    }
    return false;
});