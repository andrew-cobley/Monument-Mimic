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

effect_settings['roboto slab'] = {
	font: 'roboto slab',
	weight: 'normal',
	size: 100,
	options: {
		'splitYMiddleX' : { split: {x: 0, y: 41, z: 0} },
		'splitMiddleX' : { split: {x: 0, y: 50, z: 0} },
		'splitTopX' : { split: {x: 0, y: 93, z: 0} },
		'splitBottomX' : { split: {x: 0, y: 6.8, z: 0} },
		'splitKMiddleY' : { split: {x: 37, y: 0, z: 0} },
		'splitRLeftY' : { split: {x: 23, y: 0, z: 0} },
		'splitPMiddleX' : { split: {x: 0, y: 41.5, z: 0} },
		'splitMiddleY' : { split: {x: 50, y: 0, z: 0} },
		'rotateMiddleX' : { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: Math.PI/2, y: 0 , z: 0}} },
		'rotateMiddleY' : { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: 0, y: Math.PI/2 , z: 0}} },
		'rotateDiag' : { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: 0, y: Math.PI/2, z: -Math.PI/4}} },
		'rotateDiagAlt' : { rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: -Math.PI/8, y: Math.PI/2, z: Math.PI/8}} },
		'splitXRotateY' : { split: {x: 0, y: 38, z: 0}, rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: 0, y: Math.PI/2, z: 0} } },
		'splitXRotateZ' : { split: {x: 0, y: 41, z: 0}, rotation: {r0: {x: 0, y: 0, z: 0}, r1: {x: 0, y: 0, z: Math.PI/2} } }
	},
	characters: {
		'default': 'splitMiddleX',
		'A': 'splitMiddleY',
		'B': 'rotateMiddleX',
		'C': 'splitMiddleX',
		'D': 'splitMiddleX',
		'E': 'rotateMiddleX',
		'F': 'rotateMiddleY',
		'G': 'splitXRotateY',
		'H': 'splitMiddleY',
		'I': 'splitBottomX',
		'J': 'splitXRotateY',
		'K': 'splitKMiddleY',
		'L': 'splitTopX',
		'M': 'splitMiddleY',
		'N': 'rotateDiagAlt',
		'O': 'splitMiddleY',
		'P': 'splitPMiddleX',
		'Q': 'rotateMiddleX',
		'R': 'splitRLeftY',
		'S': 'rotateDiag',
		'T': 'splitTopX',
		'U': 'splitTopX',
		'V': 'rotateMiddleY',
		'W': 'rotateMiddleX',
		'X': 'splitBottomX',
		'Y': 'rotateMiddleY',
		'Z': 'rotateDiag'
	}
};