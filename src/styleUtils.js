function padding() {
	if (arguments.length === 0) {
		return {}
	}

	if (arguments.length === 1) {
		return {
			padding: arguments[0]
		}
	}

	if (arguments.length === 2) {
		var [vertical, horizontal] = arguments;
		return {
			paddingVertical: vertical,
			paddingHorizontal: horizontal,
		}
	}

	if (arguments.length === 3) {
		var [top, vertical, bottom] = arguments;
		return {
			paddingTop: top,
			paddingBottom: bottom,
			paddingVertical: vertical,
		}
	}

	var [top, right, bottom, left] = arguments;
	return {
		paddingTop: top,
		paddingBottom: bottom,
		paddingLeft: left,
		paddingRight: right,
	}
}

function margin() {
	if (arguments.length === 0) {
		return {}
	}

	if (arguments.length === 1) {
		return {
			margin: arguments[0]
		}
	}

	if (arguments.length === 2) {
		var [vertical, horizontal] = arguments;
		return {
			marginVertical: vertical,
			marginHorizontal: horizontal,
		}
	}

	if (arguments.length === 3) {
		var [top, vertical, bottom] = arguments;
		return {
			marginTop: top,
			marginBottom: bottom,
			marginVertical: vertical,
		}
	}

	var [top, right, bottom, left] = arguments;
	return {
		marginTop: top,
		marginBottom: bottom,
		marginLeft: left,
		marginRight: right,
	}
}

function size() {
	if (arguments.length === 1) {
		var size = arguments[0];
		return {
			width: size,
			height: size
		};
	}

	var [width, height] = arguments;
	return {
		width: width,
		height: height
	}
};

module.exports = {
	margin,
	padding,
	size
};