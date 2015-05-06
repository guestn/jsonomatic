var fs =require('fs');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var FM = require('./modules/functions-manager');



module.exports = function(app) {

	app.get('/', function(req, res){	
		res.render('jsonomatic',{title : 'JSONOMATIC'})
	});
	
	
	app.post('/submit', urlencodedParser, function (req, res, err) {
       var jsonInput = req.body.output;
	   console.log(jsonInput);
	   FM.process(req, res);
	   
	   res.send('thanks');
	});
	
	app.get('/fonts', function(req, res) {
		
		var fonts = [];
		var fontManager = require('font-manager');
		fontManager.getAvailableFonts(function(fonts) { 
			res.render('fonts', {fonts: fonts, sendstr : 'the quick brown fox 1234567890', size: '20px'});
		});
	});
	
	app.post('/send', urlencodedParser, function(req, res, err){
		var fontManager = require('font-manager');
		var sendstr = req.body.sendstr;
		var size = req.body.size;

		var FM = new fontManager.getAvailableFonts(function(fonts) { 
			/*res.render('fonts', {
				fonts: fonts,
				size: size,
				sendstr : sendstr
			});*/
			res.json(fonts);
		});

	})

};//final app closing


