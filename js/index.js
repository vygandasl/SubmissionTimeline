var boxes = document.querySelectorAll('.box');
for (var i = 0; i < boxes.length; i++) {
	if (boxes[i].addEventListener) {
		boxes[i].addEventListener('click', clickHandler);
	} else {
		boxes[i].attachEvent('onclick', clickHandler);
	}
}

var detectOverlap = (function () {
	function getPositions(elem) {
		var pos = elem.getBoundingClientRect();
		return [[pos.left, pos.right], [pos.top, pos.bottom]];
	}

	function comparePositions(p1, p2) {
		var r1, r2;
		r1 = p1[0] < p2[0] ? p1 : p2;
		r2 = p1[0] < p2[0] ? p2 : p1;
		return r1[1] > r2[0] || r1[0] === r2[0];
	}

	return function (a, b) {
		var pos1 = getPositions(a),
			pos2 = getPositions(b);
		return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
	};
})();

function clickHandler(e) {

	var elem     = e.target,
		elems    = document.querySelectorAll('.box'),
		elemList = Array.prototype.slice.call(elems),
		within   = elemList.indexOf(elem),
		touching = [];
	if (within !== -1) {
		elemList.splice(within, 1);
	}
	for (var i = 0; i < elemList.length; i++) {
		if (detectOverlap(elem, elemList[i])) {
			touching.push(elemList[i].id);
		}
	}
	if (touching.length) {
		console.log(elem.id + ' touches ' + touching.join(' and ') + '.');
		alert(elem.id + ' touches ' + touching.join(' and ') + '.');
		var x = document.getElementById("box1").innerHTML;
		var y = document.getElementById("box2").innerHTML;

		Object.assign(x, y);

		console.log(document.getElementById("box5").innerHTML);
	} else {
		console.log(elem.id + ' touches nothing.');
		alert(elem.id + ' touches nothing.');
	}

}