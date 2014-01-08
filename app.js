/// Utils
var argsDefault = {
	"port": "3125"
};

var extend = function(target) {
	
	var sources = [].slice.call(arguments, 1);

	sources.forEach(function (source) {
		for(var prop in source) {
			target[prop] = source[prop];
		}
	});

    return target;

}

var argParser = function() {

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

var parseParams = function(params, callback) {

	if(params.time) {
		setTimeout(function() {
			callback.apply();
		}, params.time);
	} else {
		callback.apply();
	}

}
// //Utils



var express = require("express"),
	app = express(),
	fs = require("fs"),
	args = argParser();



// Static content
app.use("/js", express.static(__dirname + '/prod/js'));
app.use("/js", express.static(__dirname + '/prod/js/vendor'));
app.use("/i", express.static(__dirname + '/prod/i'));
app.use("/css", express.static(__dirname + '/prod/css'));
app.use("/dummy", express.static(__dirname + '/prod/dummy'));
// //Static content



// Router
app.get("/:page", function(req, res) {

	fs.readFile("./prod/pages/" + req.route.params.page + ".html", "utf8", function(err, text) {

		parseParams(req.query, function() {
			res.send(text);
		});

	});

});
// //Router



app.listen(args.port);