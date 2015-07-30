//Reset scope to 1 for every page, so next search doesn't break
createCookie('SESSION_SCOPE', 1);

//university navigation menu
$('#toggle-university-nav, #top-nav-container .menu-toggle, #close-university-nav').on('click', function() {
  $('#university-nav').slideToggle();
  $('#toggle-university-nav').toggleClass('active').find('i').toggleClass('fa-caret-down').toggleClass('fa-caret-up');
});