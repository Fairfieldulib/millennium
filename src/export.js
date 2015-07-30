//fix export display
if (window.location.href.indexOf('++export') !== -1) {
  $('.fullPage > center > table:first-of-type').addClass('content-center export-table');
}

//export fix
if (window.location.href.indexOf('++export') !== -1) {
  $(document).ready(function(){
    $('input[name="email_addx"]').after('<p>Separate multiple emails with commas.</p>');
    $('form').submit(function(e) {
      var emails = $('input[name="email_addx"]').val($('input[name="email_addx"]').val().replace(' ', ''));
      var $form = $(this);
      var options = $form.serialize();
      options.split('&').forEach(function(opt) {
        opt = opt.split('=');
        if (opt[0] === 'ex_device' && opt[1] === '43') {
          $.ajax({
            method:'POST',
            url: $form.attr('action'),
            data:options
          }).done(function(resp) {
            resp = resp.replace('<!--', '<html>');
            var $resp = $('<div>').append(resp);
            $resp.find('a').remove();
            var newWindow = window.open();
            newWindow.document.write($resp.html());
          });
          e.preventDefault();
        }
      });
    });
  });
}