//open in new window for locations
$('.bibItems tr td:first-of-type a').attr('target', '_blank');

//add btn class to briefcit click to view links
$('.briefcitActions a:first-of-type').filter(function() {return ($(this).attr('href').trim() !== '' && $(this).text().trim() !== '');}).addClass('btn btn-sm btn-primary');