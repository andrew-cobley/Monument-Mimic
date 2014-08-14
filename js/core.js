/*!
 * - XXXXXXXX
 * Core Javascript Methods
 * Copyright 2014, Andrew Cobley
 */

var scene1, scene2;
var line1, line2;
var lineTest;
var word_scene;
var scrollPercent = 0;

var text1, text2, font;

$(function() {

  	// Initialise JS for current browser
  	initPage();

  	// Init 3D Text Effects
  	init3DText();

  	// Initialise scroller library
	var s = skrollr.init({
		forceHeight: false,
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
    });

  	$(document).scroll(function() {
  		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  		var scrollLimit = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - window.innerHeight;
  		var scrollLimit = $('#text-wrapper').height() * 1.2;
  		console.log(scrollLimit);
  		scrollPercent = (scrollTop / scrollLimit) * 100;
  		if(scrollPercent < 0) {
  			scrollPercent = 0;
  		}
  		else if (scrollPercent > 100) {
  			scrollPercent = 100;
  		}
  		console.log(scrollTop + " / " + scrollLimit + " * 100 = " + scrollPercent);
  		update();

  		var opacity = $('#text-wrapper .text-inner').css('opacity');
  		var margin_top_max = -80;
  		var margin_top = margin_top_max * (1 - opacity);
  		$('#text-wrapper .text-inner h1').css('margin-top', margin_top + "px");
  		console.log(opacity);

  		// 
  		checkEditAllow(scrollTop);
	});

	$(document).click(function() {

	});


    $(window).resize(function() {
      //scene1.resize();
      line1.resize();
      line2.resize();

      resizeContainers()
    });

	//update();

});

function initPage() {

	// Set initial values
	text1 = $('#ThreeD-1').text();
	text2 = $('#ThreeD-2').text();
	font = "lato";

	// Add Listeners
	addSettingsListeners();

	$('#content').css('background', 'none');
	resizeContainers();

}

function checkEditAllow(scrollTop) {

	console.log("Check!");

	if(scrollTop > 20 && scrollTop < 200)
  	{
  		$('#open-settings').css('opacity', 0.7);
  	}
  	else
  	{
  		$('#open-settings').css('opacity', 0);
  	}

}

function addSettingsListeners() {
	$('#open-settings').click(function(e) {
		e.preventDefault();
		clickOpenSettings();
	});
	$('#edit-cancel').click(function() {
		clickEditCancel();
	});
	$('#settings').submit(function(e) {
		clickEditSubmit();
		return false;
	});
}

function clickOpenSettings() {
	console.log("Open Settings");
	$('#text1').val(text1);
	$('#text2').val(text2);
	
	$('#font option[value="' + font + '"]').prop('selected',true);

	$('#edit-wrapper').css('bottom', 0);
	$('#edit-wrapper').fadeIn();
}

function clickEditSubmit() {
	console.log("Submit Edit");

	text1 = $('#text1').val();
	text2 = $('#text2').val();

	font = $('#font').find(":selected").val();

	$('#edit-wrapper').animate({
		bottom: '120%',
	}, 500, function() {
		$('#edit-wrapper').fadeOut(function() {
			$('canvas').fadeOut(function() {
				init3DText();
				update();
				$('canvas').fadeIn();
			});
		});
	});

	//$('#edit-wrapper').fadeOut();



	console.log("T1 = " + text1 + " | T2 = " + text2 + " | F = " + font);
}

function clickEditCancel() {
	console.log("Cancel Edit");
	$('#edit-wrapper').fadeOut();
}

function init3DText() {

	if(effect_settings[font])
	{
		var settings = effect_settings[font];

		line1 = new Line();
  		$('#ThreeD-1').text('');
  		line1.init("ThreeD-1", text1, settings);
	
  		line2 = new Line();
  		$('#ThreeD-2').text('');
  		line2.init("ThreeD-2", text2, settings);
	}
	else
	{
		console.error("FONT EFFECT SETTINGS NOT FOUND");
		// -> OR REVERT TO DEFAULTS?
	}


}

function resizeContainers() {

	// Valley
	var el = $('div#valley-1');
	var ratio = el.width() / parseInt( el.css('max-width') );
	console.log(el.width());
  	var height = parseInt(el.css('max-height')) * ratio;
  	console.log(height);
  	$('div.valley').height(height);

  	// Content
  	$('#content-wrapper').height($('#content').height());
}

function update() {
  	//scene1.update(scrollPercent);
  	//scene2.update(scrollPercent);
  	line1.update(scrollPercent);
  	line2.update(scrollPercent);
}


var rotWorldMatrix;

// Rotate an object around an arbitrary axis in world space       
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    
    // >>> REMOVED TO STOP ADDITION
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    object.rotation.setFromRotationMatrix(object.matrix);
}


