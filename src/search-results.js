//on search results page add left panel
if ($('.briefcitCell .media.well').length > 0) {
  var materialSelected = false;

  var $table = $('.briefcitCell').closest('table');    
  var $options = $('#searchscope option');
  var currentScope;
  var scopes = '<div id="facet-collection" class="panel-collapse collapse in" aria-expanded="true"><div class="panel-body"><ul>';
  $options.each(function() {
    var link = advancedUrl.replace(/search~S[0-9]/,'search~S' + $(this).val());
    if (advancedUrl.indexOf('searchscope') !== -1) {
      link = link.replace(/searchscope=[0-9]/g, 'searchscope=' + $(this).val());
    }
    var active = '';
    if (advancedUrl === link) {
      active = 'class="active"';
      currentScope = $(this).val();
      link = advancedUrl.replace(/search~S[0-9]/,'search~S1');
      if (advancedUrl.indexOf('searchscope') !== -1) {
        link = link.replace(/searchscope=[0-9]/g, 'searchscope=1');
      }
    }
    var filters;
    var validMaterials = materials[$(this).val() - 1].map(function(el) {
      for (var key in el) {
        if (el.hasOwnProperty(key)) {
          return el[key];
        }
      }
    });
    var regex = /&m=([a-zA-Z])/g;
    var filter;
    while((filter = regex.exec(link)) !== null) {
      if (validMaterials.indexOf(filter[1]) === -1) {
        link = link.replace(filter[0], '');
      }
    }
    scopes += '<li><a '+active+' href="' + link + '">' + $(this).text()+ '</a></li>';
  });
  scopes += '</ul></div></div>';
  
  var isIn = '';
  if (currentScope !== '1') {
    isIn = 'in';
  }
  var materialsList = '<div id="facet-materials" class="panel-collapse ' + isIn + ' collapse" aria-expanded="false"><div class="panel-body"><ul>';
  materials[currentScope - 1].forEach(function(mat) {
    var link;
    var active = '';
    var spinner = '<i style="text-indent:0" class="fa fa-spin fa-spinner"></i>';
    if (advancedUrl.indexOf('m=') === -1) {
      link = advancedUrl + '&m=' + mat[Object.keys(mat)[0]];
    } else if (advancedUrl.charAt(advancedUrl.indexOf('m=') + 2) === mat[Object.keys(mat)[0]]) {
      link = advancedUrl.replace('&m=' + mat[Object.keys(mat)[0]], '');
      active = 'class="active"';
      spinner = '';
      materialSelected = true;
    } else {
      link = advancedUrl.replace(/&m=[a-z]/, '&m=' + mat[Object.keys(mat)[0]]);
    }
    materialsList += '<li><a '+active+' href="' + link + '">' + Object.keys(mat)[0] + '';
    materialsList += '<span class="pull-right">' + spinner + '</span>';
    materialsList += '</a></li>';
  });
  materialsList += '</ul></div></div>';
  
  var yearAfter = advancedUrl.match(/&Da=([0-9]{1,4})/);
  yearAfter = yearAfter ? yearAfter[1] : '';
  var yearBefore = advancedUrl.match(/&Db=([0-9]{1,4})/);
  yearBefore = yearBefore ? yearBefore[1] : '';
  
  var panelTitle = '<div class="panel panel-default">\
    <div class="collapse-toggle panel-heading" data-toggle="collapse" data-target="#facet-insertLinkName">\
      <h3 class="panel-title">\
        <a href="javascript:void(0)">insertTitle</a>\
      </h3>\
    </div>';
  
  var clearFilters = '';
  if (materialSelected || currentScope !== '1' || yearAfter || yearBefore) {
    clearFilters = '<i class="fa fa-times-circle"></i> Clear Filters';
  }
  
  var html = '<div class="facets hidden-xs">';
  if (advancedUrl.indexOf('/exact') === -1) {
  html += '<div id="clear-facets">' + clearFilters + '</div>\
  <h3>Refine your search</h3>' +
    panelTitle.replace('insertTitle', 'Collection').replace('insertLinkName', 'collection') +
    scopes +
  '</div>';
    html += panelTitle.replace('insertTitle', 'Material Type').replace('insertLinkName', 'materials') +
      materialsList +
    '</div>';
    html += panelTitle.replace('insertTitle', 'Year').replace('insertLinkName', 'year') +
      '<div id="facet-year" class="panel-collapse collapse" aria-expanded="false">\
        <div class="panel-body">\
          <form id="set-year">\
          <input id="year-after" value="' + yearAfter + '"> -\
          <input id="year-before" value="' + yearBefore + '">\
          <button class="btn">Apply</button>\
          </form>\
        </div>\
      </div>';
  } else {
    html += '<p style="padding:10px;">Search Refinements not available for current search.</p>';
  }
  html += '</div>';
  $table.parent().prepend(html).css({'max-width':'1260px','margin': '0 auto'});
  
  //Adds counts to material type, removes if no results
  var countsLoading = false;
  var showResultCounts = function() {
    var materials = [];
    var link;
    if (countsLoading) {
      return false;
    }
    countsLoading = true;
    $('#facet-materials a:not(.active)').each(function() {
      var $el = $(this);
      link = $el.attr('href');
      materials.push(link.match(/&m=([a-z])/)[1]);
      if (link.indexOf('http://') === -1 && link.indexOf('https://') === -1) {
        link = window.location.origin + link;
      }
      link = link.replace(/&m=[a-z]/, '');
    });
    $.ajax({
      url: '//library2.fairfield.edu/millennium/result_count.php',
      data: {
        base: link,
        materials: materials.join(','),
      },
      dataType: 'jsonp',
      success:function(data) {
        for (var prop in data) {
          if (data[prop] !== 0) {
            $('#facet-materials a:not(.active)[href*="&m=' + prop + '"] span').text(data[prop]);
          } else {
            $('#facet-materials a:not(.active)[href*="&m=' + prop + '"]').parent().remove();
          }
        }
      }
    });
  };
  
  //Set which tabs are open based on current search
  if (currentScope === '1') {
    $('#facet-materials').on('shown.bs.collapse', function() {
      showResultCounts();
    });
  } else {
    showResultCounts();
  }
  if (materialSelected) {
    $('#facet-materials:not(.in)').collapse('show');
  }
  if (yearBefore || yearAfter) {
    $('#facet-year:not(.in)').collapse('show');
  }
  
  //Events for submitting new search based on using facets
  $('#set-year').submit(function(e) {
    e.preventDefault();
    var $after = $('#year-after');
    var $before = $('#year-before');
     advancedUrl = advancedUrl.replace(/&Da=[0-9]{0,4}/, '');
     advancedUrl = advancedUrl.replace(/&Db=[0-9]{0,4}/, '');
    if ($after.val()) {
      advancedUrl = advancedUrl + '&Da=' + $after.val();
    }
    if ($before.val()) {
      advancedUrl = advancedUrl + '&Db=' + $before.val();
    }
    window.location = advancedUrl;
  });
  
  $('#clear-facets').on('click', function() {
    advancedUrl = advancedUrl.replace(/search~S[0-9]/, 'search~S1');
    advancedUrl = advancedUrl.replace(/searchscope=[0-9]/, 'searchscope=1');
    advancedUrl = advancedUrl.replace(/&Da=[0-9]{0,4}/, '');
    advancedUrl = advancedUrl.replace(/&Db=[0-9]{0,4}/, '');
     advancedUrl = advancedUrl.replace(/&m=[a-z]/, '');
    window.location = advancedUrl;
  });
}