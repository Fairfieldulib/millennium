//fix columns of reserve listings
$('.browseEntry td:nth-of-type(2)').each(function() {
  $el = $(this);
  var text = $el.text().split('/');
  var link = '<a href="' + $el.find('a').attr('href') + '">';
  if (text.length === 4) {
    $el.html(link + text[2].trim() + '</a>').parent().append('<td>' +link + text[0].trim() + '</a></td><td>' + link + text[1].trim() + '</a></td><td>' + link + text[3].trim() + '</a></td>');
  }
});
$('.browseHeader').append('<td><td><td>');
$('.browseSuperEntry td').attr('colspan', 5);
if ($('reserveBibsArea').length !== 0 ||
  window.location.search.indexOf('searchtype=p') !== -1 ||
  window.location.search.indexOf('searchtype=r') !== -1 ||
  $('select[name="searchtype"]').val() === 'p' ||
  $('select[name="searchtype"]').val() === 'r') {
  $('#searchtype').show();
}
if ($('#bibTable').length > 0) {
  $('#searchtype').hide();
}