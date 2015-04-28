
function searchCallback(results) {
	$('#searchResults').empty();
	for (var i = 0; i < 9; i++) {
		var currentRow;
		var platformName = "";
		for (var j = 0; j < results[i].platforms.length; j++) {
			platformName += " - " + results[i].platforms[j].name;
		}
		if(i % 3 == 0) {
			currentRow = i;
			$('#searchResults').append(
				'<div id="searchRow' + currentRow + '"class="row">' +
					'<div id="result' + (i+1) + '" class="col-md-4 well">' +
						'<div id="name" ><p class="lead">Game Title:</p> ' + results[i].name + '</div>' +
						'<div id="image"><img class="hidden-sm hidden-xs" src="' + results[i].image.thumb_url + '"/></div>' +
						'<div id="description" class="bob"><h5>Description:</h5> ' + results[i].deck + '</div>' +
						'<div id="platforms" class="bob"><h5>Supported Platforms:</h5> ' + platformName + '</div>' +
						'<button class="btn btn-sm btn-success removeBtn">Remove</button>' +
					'<div>' +
				'</div>'
			).hide().fadeIn('slow');
		} else {
			$('#searchResults').children('#searchRow'+currentRow).append(
				'<div id="result' + (i+1) + '" class="col-md-4 well">' +
					'<div id="name"><p class="lead">Game Title:</p> ' + results[i].name + '</div>' +
					'<div id="image"><img class="hidden-sm hidden-xs" src="' + results[i].image.thumb_url + '"/></div>' +
					'<div id="description" class="bob"><h5>Description:</h5> ' + results[i].deck + '</div>' +
					'<div id="platforms" class="bob"><h5>Supported Platforms:</h5> ' + platformName + '</div>' +
					'<button class="btn btn-sm btn-success removeBtn">Remove</button>' +
				'<div>'
			).hide().fadeIn('slow');
		}
	}
}

var apikey = "d40a650b5d8cc7c495d91736f95dee0b8993d809";

$(document).ready(function() {
	$('.btn').on('click', function(){
		$('#searchResults').empty();
		search('batman');
	});
	$('#searchResults').on('click', ".col-md-4", function(){
		if($(this).children('.bob').first().css('display') == 'none') {
			$(this).children('.bob').show();
		} else {
			$(this).children('.bob').hide();
		}
	});
	$('#searchResults').on('click', '.removeBtn', function(){
		$(this).parent().fadeOut('slow');
	});
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}