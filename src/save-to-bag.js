//add to bag ajax (page must already have bag visible)
if ($('.btn:contains("View Saved")').length !== 0) {
  replace_or_redraw = function(url) {
    $.get(url).done(function() {
      var $el = $('a[onclick="return replace_or_redraw(\'' + url + '\')"]');
      if (url.indexOf('saved') !== -1) {
        url = url.replace('saved', 'save');
        $el.find('input').removeAttr('checked');
      } else {
        url = url.replace('save', 'saved');
        $el.find('input').prop('checked',true);
      }
      $el.attr('onclick', "return replace_or_redraw('" + url + "')");
    });
    return false;
  };
}