var effect_settings = [];

effect_settings['fallback'] = {
};

effect_settings['lato'] = {
	font: 'lato',
	weight: 'normal',
	size: 100,
	options: {
		'splitYMiddleX' : { split: {x: 0, y: 41, z: 0} },
		'splitMiddleX' : { split: {x: 0, y: 50, z: 0} },
		'splitBottomX' : { split: {x: 0, y: 6.5, z: 0} },
		'splitLeftY' : { split: {x: 12.3, y: 0, z: 0} },
		'splitMiddleY' : { split: {x: 50, y: 0, z: 0} },
		'rotateMiddleX' : { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: Math.PI/2, y: 0 , z: 0}} },
		'rotateMiddleY' : { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: 0, y: Math.PI/2 , z: 0}} },
		'rotateDiag' : { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: 0, y: Math.PI/2, z: Math.PI/4}} },
		'rotateDiagAlt' : { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: -Math.PI/8, y: Math.PI/2, z: Math.PI/8}} }
	},
	characters: {
		'default': 'splitMiddleX',
		'A': 'rotateMiddleX',
		'B': 'splitMiddleX',
		'C': 'splitMiddleX',
		'D': 'splitMiddleX',
		'E': 'splitLeftY',
		'F': 'rotateMiddleX',
		'G': 'rotateMiddleX',
		'H': 'splitMiddleY',
		'I':'rotateMiddleX',
		'J': 'rotateMiddleX',
		'K': 'splitMiddleY',
		'L': 'splitBottomX',
		'M': 'splitMiddleY',
		'N': 'rotateDiagAlt',
		'O': 'splitMiddleX',
		'P': 'rotateMiddleX',
		'Q': 'rotateDiag',
		'R': 'rotateMiddleX',
		'S': 'rotateMiddleX',
		'T': 'rotateMiddleX',
		'U': 'splitMiddleX',
		'V': 'rotateMiddleY',
		'W': 'splitMiddleY',
		'X': 'splitMiddleX',
		'Y': 'splitYMiddleX',
		'Z': 'rotateDiag'
	}
};