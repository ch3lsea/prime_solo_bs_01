
function searchCallback(results) {
	$('#searchResults').empty();
	for (var i = 0; i < 9; i++) {
		var platformName = "";
		for (var j = 0; j < results[i].platforms.length; j++) {
			platformName += " - " + results[i].platforms[j].name;
		}
		$('#searchResults').append(
			'<div class="col-md-4 well text-center pagination-centered resultHeight">' +
				'<div id="name" >Game Title: <p class="lead">' + results[i].name + '</p></div>' +
				'<div id="image"><img class="hidden-sm hidden-xs" src="' + results[i].image.small_url + '"/></div>' +
				'<div id="description" class="bob"><h5>Description:</h5> ' + results[i].deck + '</div>' +
				'<div id="platforms" class="bob"><h5>Supported Platforms:</h5> ' + platformName + '</div>' +
				'<button class="btn btn-sm btn-success removeBtn">Remove</button>' +
				'<button class="btn btn-sm btn-primary expandBtn">Expand</button>' +
			'<div>').hide().fadeIn('slow');
	}
	$('.appendP').append('<p>Click on the expand button to see the description and supported platforms</p>');
}

var apikey = "d40a650b5d8cc7c495d91736f95dee0b8993d809";
var userInput = "";

$(document).ready(function() {
	$('.btn').on('click', function(){
		$('#searchResults').empty();
		userInput = $('#search').val();
		search(userInput);
	});
	$('#searchResults').on('click', ".expandBtn", function(){
		if($(this).siblings('.bob').css('display') != 'none') {
			$(this).siblings('.bob').hide();
		} else {
			$(this).siblings('.bob').show();
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
	        console.log(data.results);
	    }
	});

}