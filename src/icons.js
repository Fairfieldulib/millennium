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