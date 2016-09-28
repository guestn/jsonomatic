/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes/router');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var FM = require('./routes/modules/functions-manager');



var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3020;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost'; //'0.0.0.0';

// all environments
app.set('port', server_port);
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('view engine', 'jade');

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true}));     // to support URL-encoded bodies
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon("public/images/favicon.png")); 



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

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
	//app.get('/users', user.list);

/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/

http.createServer(app).listen(app.get('port'), server_ip_address, function(){
	console.log("Express server listening on ip "+server_ip_address+" port " + app.get('port'));
})