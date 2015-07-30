//fix table display in staff view
if ($('.btn:contains(Patron View)').length !== 0 || window.location.search.indexOf('staffi') !== -1) {
  $('.navigationRow ~ table').addClass('table').find('td').css({padding:'4px'});
  $('.navigationRow ~ table table').addClass('table table-striped table-bordered').css({marginBottom:0});
  $('.navigationRow ~table table').last().find('a').css({'font-weight':'bold'});
  $('td strong').addClass('pull-right');
}