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

	resizeContainers();

	// Check for WebGL

	if (!window.WebGLRenderingContext)
	{
		// the browser doesn't even know what WebGL is
		//window.location = "http://get.webgl.org";
		initPageNoWebGL();
	} else
	{
		var canvas = document.getElementById("canvas-test");
    	//var ctx = canvas.getContext("webgl");
    	var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    	console.dir(ctx);
    	if (!ctx)
    	{
			initPageWebGLProblem();
		}
		else 
		{
			initPage();
			init3DText();
		}
	}


  	// Initialise scroller library
	var s = skrollr.init({
		forceHeight: false,
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
    });

    $(window).resize(function() {
      resizeContainers()
    });

	//update();

});

function initPage() {

	// Set initial values
	text1 = $('#ThreeD-1').text();
	text2 = $('#ThreeD-2').text();
	font = "lato";

	// Remove No-WebGL section
	$('#text-no-webgl').remove();

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

	// Add scroll listener
	$(document).scroll(function() {
  		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  		var scrollLimit = $('#text-wrapper').height() * 1.2;
  		scrollPercent = (scrollTop / scrollLimit) * 100;

  		if(scrollPercent < 0) {
  			scrollPercent = 0;
  		}
  		else if (scrollPercent > 100) {
  			scrollPercent = 100;
  		}

  		update();

  		var opacity = $('#text-wrapper .text-inner').css('opacity');
  		var margin_top_max = -80;
  		var margin_top = margin_top_max * (1 - opacity);
  		$('#text-wrapper .text-inner h1').css('margin-top', margin_top + "px");
  		console.log(opacity);

  		checkEditAllow(scrollTop);
	});

	// Add resize listener to deal with Line adjustments.
	$(window).resize(function() {
      line1.resize();
      line2.resize();
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

function update()
{
  	line1.update(scrollPercent);
  	line2.update(scrollPercent);
}

function initPageNoWebGL() 
{
	$('#text-wrapper').remove()
	$('#edit-wrapper').remove()
	$('#text-no-webgl p').html("I'm really sorry but unfortunately this is so cutting edge that sadly your web browser isn't capable of displaying it.  Fear not, most current versions of desktop browsers <a href='http://get.webgl.org'>support WebGL</a> and mobile browsers will have support soon. If you are completely stuck then you should go and play <a href='http://www.monumentvalleygame.com'>Monument Valley</a> until the world catches up.")
	$('#text-no-webgl').css('display', 'block');
}

function initPageWebGLProblem() 
{
	$('#text-wrapper').remove();
	$('#edit-wrapper').remove();
	$('#text-no-webgl p').html("Hmm, it seems like WebGL is available but not working correctly in your browser. Let's try and <a href='http://get.webgl.org/troubleshooting'>solve the issue!</a>");
	$('#text-no-webgl').css('display', 'block');
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


