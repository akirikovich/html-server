var Helper = {};
var path = require('path');

/** Combines two or more objects 
* @target (object): final object
* @objects (object): two or more objects
*/
function extend(target) {

	var sources = [].slice.call(arguments, 1);

	sources.forEach(function (source) {
		for(var prop in source) {
			target[prop] = source[prop];
		}
	});

	return target;

}


function getArguments(argsDefault) {
	var args = {};

	for(var i = 0, len = process.argv.length; i < len; i++) {

		var cmd = process.argv[i];

		if(cmd.indexOf("=") == -1) {
			continue;
		}

		var splitCmd = cmd.split("="),
			param = splitCmd[0].replace(new RegExp("-", "g"), "");

		args[param] = splitCmd[1];

	}

	return extend({}, argsDefault, args);
}



/** Parser and setter configuration paramaters
* @config (object): configuration object
*/
Helper.setConfig = function(app, express) {
	if(!app || !express) {
		return null;
	}

	var config = getArguments({
		port: 8000,
		basepath: 'prod'
	});

	// Paths
	if(config.basepath) {
		app.set(config.basepath);
		app.use('/', express.static(config.basepath));
	}
	// //Paths

	// Port
	if(config.port) {
		app.set("port", config.port);
	}
	// //Port
};



/** GET params parser
* @params (object) GET parameters
* @callback (function) callback function
*/
Helper.parseParams = function(params, callback) {
	if(params.time) {
		setTimeout(function() {
			callback.apply();
		}, params.time);
	} else {
		callback.apply();
	}
};

module.exports = Helper