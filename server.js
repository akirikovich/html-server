var express = require("express"),
	app = express(), // Express application initialization
	fs = require("fs"), // File system module,
	path = require("path"),
	helper = require("./src/helper"); // Helper`s methods


helper.setConfig(app, express); // Setting configuration params


// Router
// Simple pages
app.get('/:page', function(req, res) {
	var basePath = app.get('basepath') || '';
	var nameFile = path.resolve(basePath, req.route.params.page);

	fs.readFile(nameFile, "utf8", function(err, text) { //Read required html page

		helper.parseParams(req.query, function() { // Parse GET params
			if (err) {
				return res.send(404, 'There is an error occured. Please, try again later!');
			}
			res.send(text);
		});

	});

});



app.listen(app.get("port")); // Server starting