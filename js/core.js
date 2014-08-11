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

$(function() {

  	init3DText();
  	resizeContainers();

  	// Initialise scroller library
	var s = skrollr.init({
		forceHeight: false,
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
    });

  	$(document).scroll(function() {
  		var scrollTop = document.body.scrollTop;
  		var scrollLimit = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - window.innerHeight;
  		var scrollLimit = $('#text-wrapper').height() * 0.8;
  		console.log(scrollLimit);
  		scrollPercent = (scrollTop / scrollLimit) * 100;
  		if(scrollPercent < 0) {
  			scrollPercent = 0;
  		}
  		else if (scrollPercent > 100) {
  			scrollPercent = 100;
  		}
  		//console.log(scrollPercent);
  		update();

  		var opacity = $('#text-wrapper .text-inner').css('opacity');
  		var margin_top_max = -80;
  		var margin_top = margin_top_max * (1 - opacity);
  		$('#text-wrapper .text-inner h1').css('margin-top', margin_top + "px");
  		console.log(opacity);
	});

	$(document).click(function() {
		console.log("click");
		line1.restore();
	});


    $(window).resize(function() {
      //scene1.resize();
      line1.resize();
      line2.resize();

      resizeContainers()
    });

	//update();

});

function init3DText() {

  	line1 = new Line();
  	var text = $('#ThreeD-1').text();
  	$('#ThreeD-1').text('');
  	line1.init("ThreeD-1", text);

  	line2 = new Line();
  	var text = $('#ThreeD-2').text();
  	$('#ThreeD-2').text('');
  	line2.init("ThreeD-2", text);

}

function resizeContainers() {

	var el = $('div#valley-1');
	var ratio = el.width() / parseInt( el.css('max-width') );
	console.log(el.width());
  	var height = parseInt(el.css('max-height')) * ratio;
  	console.log(height);
  	$('div.valley').height(height);
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


function fetchOptionsForLetter(letter) {
	var options = [];
	//options['splitMiddleX'] = 
	options['splitYMiddleX'] = { split: {x: 0, y: 41, z: 0} };
	options['splitMiddleX'] = { split: {x: 0, y: 50, z: 0} };
	options['splitBottomX'] = { split: {x: 0, y: 6.5, z: 0} };
	options['splitLeftY'] = { split: {x: 12.3, y: 0, z: 0} };
	options['splitMiddleY'] = { split: {x: 50, y: 0, z: 0} };
	options['rotateMiddleX'] = { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: Math.PI/2, y: 0 , z: 0}} };
	options['rotateMiddleY'] = { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: 0, y: Math.PI/2 , z: 0}} };
	options['rotateDiag'] = { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: 0, y: Math.PI/2, z: Math.PI/4}} };
	options['rotateDiagAlt'] = { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: -Math.PI/8, y: Math.PI/2, z: Math.PI/8}} };

	var letters = [];
	letters['A'] = 'rotateMiddleX';
	letters['B'] = 'splitMiddleX';
	letters['C'] = 'splitMiddleX';
	letters['D'] = 'splitMiddleX';
	letters['E'] = 'splitLeftY';
	letters['F'] = 'rotateMiddleX';
	letters['G'] = 'rotateMiddleX';
	letters['H'] = 'splitMiddleY';
	letters['I'] = 'rotateMiddleX';
	letters['J'] = 'rotateMiddleX';
	letters['K'] = 'splitMiddleY';
	letters['L'] = 'splitBottomX';
	letters['M'] = 'splitMiddleY';
	letters['N'] = 'rotateDiagAlt';
	letters['O'] = 'splitMiddleX';
	letters['P'] = 'rotateMiddleX';
	letters['Q'] = 'rotateDiag';
	letters['R'] = 'rotateMiddleX';
	letters['S'] = 'rotateMiddleX';
	letters['T'] = 'rotateMiddleX';
	letters['U'] = 'splitMiddleX';
	letters['V'] = 'rotateMiddleY';
	letters['W'] = 'splitMiddleY';
	letters['X'] = 'splitMiddleX';
	letters['Y'] = 'splitYMiddleX';
	letters['Z'] = 'rotateDiag';

	var option = options['splitMiddleX'];
	for (var index in letters) {
		//console.log(index);
		if (index === letter) {
			var option = options[letters[index]];
			break;
		}
	}

	//var option = options['splitMiddleX'];
	return option;
}


