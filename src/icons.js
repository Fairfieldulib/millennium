//new icon labels
var fixed = {
  'dvd': 'DVD',
  'cd': 'CD',
  'vhs': 'VHS'
};
$('.pull-right > img, .pull-left > img').filter(
  function() {
    return $(this).attr('src').indexOf('png') !== -1;
  })
  .wrap('<div class="media-icon">')
  .each(
    function() {
      var alt = $(this).attr('alt').toLowerCase();
      alt = fixed[alt] ? fixed[alt] : alt;
      $(this).after('<div>' + alt + '</div>');
});
$('.briefcitCell .media.well').each(
  function() {
    if ($(this).find('.bibItemsEntry:contains(Online)').length) {
      $(this).prepend('<div class="media-type">Online</div>');
    }
});

//fix issn covers
$('.media-jacket img').each(function() {
  var $this = $(this);
  var src = $this.attr('src');
  var regex = /=([0-9]{4}-?[0-9X]{4})/;
  var found = src.match(regex);
  if (found) {
    src = src.replace('isbn=', 'issn=');
    $this.attr('src', src).parent('a').attr('href', $this.parent('a').attr('href').replace('isbn=', 'issn='));
  }
});