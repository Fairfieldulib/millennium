//where all the fun begins
//if it's a KW search result page
$('form[name="searchtool"]').css({'text-align':'center'});
if ((window.location.search.match(/(searchtype=X|\?\/X)/) && !window.location.search.match(/(frameset)|=%22|%28|%29/)) || window.location.href.indexOf('~S') !== -1 || window.location.href.indexOf('search/X') !== -1 && window.location.href.indexOf('frameset') === -1 && window.location.href.indexOf('aexact') === -1 && window.location.href.indexOf('indexsort') === -1 || window.location.pathname === '/search~S1') {
  //hide stuffs
  $('form select#searchtype').hide();
  
  //add KW search field facets
  $('form[name="searchtool"]').prepend('<div class="col-sm-4 text-center" style="padding:0;"><div id="dnlFieldFacets" class="btn-group"><button type="button" id="dnlAllFacet" class="btn btn-default">All</button><button type="button" id="dnlAuthorFacet" class="btn btn-default">Author</button><button type="button" class="btn btn-default" id="dnlTitleFacet">Title</button><button type="button" id="dnlSubjectFacet" class="btn btn-default">Subject</button></div></div>');
  $('#searcharg, #searchscope').css({width:'100%'}).wrap('<div class="col-sm-3">');
  $('#searcharg').attr('required', 'required');
  $('input[name="SUBMIT"]').wrap('<div class="text-center col-sm-1">').attr('onclick', '');
  
  if ($('.msg:contains(Nearby)').length > 0) {
    $('#searcharg').parent().addClass('col-sm-offset-2');
  }
  
  //clean up whitespace in form
  $('form[name="searchtool"]').addClass('clear-fix').contents().filter(function() { return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); }).remove();

  //facet status
  var facetUsed;
  var letterLookup = {
    'a': 'Author',
    't': 'Title',
    'd': 'Subject'
  };
  var searcharg = $('#searcharg').val() ? $('#searcharg').val() : '';
  if (window.location.search.indexOf('searcharg=a%3A') != -1 || window.location.search.indexOf('?/Xa%3A') != -1 || searcharg.match(/a:\(.*\)/)) { //auth applied
    facetUsed = 'Author';
  } else if (window.location.search.indexOf('searcharg=d%3A') != -1 || window.location.search.indexOf('?/Xd%3A') != -1 || searcharg.match(/d:\(.*\)/)) { //subj applied
    facetUsed = 'Subject';
  } else if (window.location.search.indexOf('searcharg=t%3A') != -1 || window.location.search.indexOf('?/Xt%3A') != -1 || searcharg.match(/t:\(.*\)/)) { //title applied
    facetUsed = 'Title';
  } else if (searcharg.match(/[a-z]:.* [a-z]:/)) { //multiple field searched
    var matches = searcharg.match(/([a-z]):\((.+?)\)(.+?)([a-z]):\((.+?)\)((.+?)([a-z]):\((.+?)\))?((.+?)([a-z]):\((.+?)\))?/);
    var newhtml = '<div class="query-info">Search Terms: ';
    newhtml += '<strong>' + letterLookup[matches[1]] + '</strong> (' + matches[2] + ')';
    newhtml += matches[3] + '<strong>' + letterLookup[matches[4]] + '</strong> (' + matches[5] + ')';
    if (matches[6]) {
      newhtml += matches[7] + '<strong>' + letterLookup[matches[8]] + '</strong> (' + matches[9] + ')';
    }
    if (matches[10]) {
      newhtml += matches[11] + '<strong>' + letterLookup[matches[12]] + '</strong> (' + matches[13] + ')';
    }
    newhtml += '</div>';
    $('.browseSearchtoolMessage').prepend(newhtml);
    $('input#searcharg').val('');
    $('#dnlAllFacet').addClass('dnlApplied');
  } else { //no hacked facet applied
    $('#dnlAllFacet').addClass('dnlApplied');
    $('td.browseHeaderData').text($('td.browseHeaderData').text().replace('Advanced Keywords','Keywords Search'));
  }
  if (facetUsed && $('input#searcharg').length > 0) {
    $('#dnl' + facetUsed + 'Facet').addClass('dnlApplied');
    $('td.browseHeaderData').text($('td.browseHeaderData').text().replace('Advanced Keywords', facetUsed + ' Keywords Search'));
    var query = $('input#searcharg').val();
    if (query.match(/"(.*?)"~/)) {
      $('input#searcharg').val(query.match(/"(.*?)"~/)[1]);
    } else if (query.match(/"(.*?)"/)) {
      $('input#searcharg').val(query.match(/\((.*?)\)/)[1]);
    }
  }
  
  //Apply custom keyword search
  $('#dnlFieldFacets').on('click', 'button:not(.dnlApplied)', function(e) {
    $('#dnlFieldFacets button').removeClass('dnlApplied');
    $(this).addClass('dnlApplied');
    if ($('#searcharg').val() !== '') {
      $('form[name="searchtool"]').submit();
    }
  });
  
} else if (window.location.search.match(/\/browse|\/2browse/) && !window.location.search.match(/\?\/X/)) {
  
}
else {//end main if -for kw search
  $('select#searchtype').show();
}