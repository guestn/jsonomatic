var fs =require('fs');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var FM = require('./modules/functions-manager');



module.exports = function(app) {

	app.get('/', function(req, res){
		console.log('hi');
		res.render('jsonomatic2',{title : 'JSONOMATIC'})
	});
	
	
	app.post('/submit', urlencodedParser, function (req, res, err) {
       var jsonInput = req.body.output;
	   console.log(jsonInput);
	   FM.process(req, res);
	   
	   res.send('thanks');
	});

};//final app closing


