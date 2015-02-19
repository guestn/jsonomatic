//var ST = require('./modules/usstate-list');
//var EM = require('./modules/email-dispatcher');
//var ADM = require('./modules/admin-manager');


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
	
	

/*	app.get('/create', function(req, res){
		res.render('create',{title : 'create a gallery'});
	});
	
// initiate a sale
	app.post('/savegallery', function(req, res){
					console.log('post');
					// 1. Write sale to DB:
					ADM.savegallery(req, function(e, result){
						if (e) {console.log(e);}
						else {
							//redirect this way because of special condition 
							// after POST call (see purchase.js)
							console.log('_id:'+result._id);
							

							//set the id into session
							req.session.gallery = result;
							
							console.log('_id2: '+req.session.gallery._id);
							
							res.send({redirect: '/success'});
							// res.render('success', {title : 'success', id : result._id });

						};
					});
	});
	
	app.get('/success', function(req, res){
		res.render('success', {title : 'success', id : req.session.gallery._id });
	});
	
	app.get('/show/:_id', function(req, res){
		var galleryid = req.params._id;
		if (galleryid.length != 24) {
			res.render('404');
		} else {
			console.log('galleryid: '+galleryid);
			ADM.showgallery(galleryid, function(e, result){
				if (e) {console.log(e);}
				else {
					res.render('show', {title: 'I Lived There- my gallery', gallery : result});
				}
			});
		}
	
	});
	
*/

};//final app closing


