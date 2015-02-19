var moment = require('moment');
var traverse = require('traverse');

exports.process = function(req, res) {

	//return function(req, res) {
		//console.log('processing'+req.body.first);
		
		var jsonInput = req.body.output;
		
		var repeats = req.body.repeats;	
		//$('#generating').addClass('generating').removeClass('not-generating');
		//$('#buttonGenerate').html('....');
		
	    //var output = editor.getValue();
	    var Jobj = JSON.parse(jsonInput); 
	    console.log(Jobj);
	    
	    //initialise the random arrays:
		var firstname = ["John","James","Joe"];
		var lastname = ["Smith","Jones","Brown","Davis"];
		var company = ["Newdex","Zaamtom","Silvertech","Drillcon","Wepco"];
		
		var lorem = ["ipsum","dolor","it","amet","consectetur","adipisicing","elit","sed" ];
		
		var randomArray = { firstname: firstname, lastname: lastname, company: company };
			
	
		var finaloutput = [];
		
		//function to parse INT string and produce random integer
		function INT(lo, hi) {
			lo = parseInt(lo);
			hi = parseInt(hi);
			
			return l = Math.round((Math.random()*(hi-lo)+lo));
			console.log('l: '+l);
		};
		
		function createText(wordsCount) {
			//console.log('wordsCount: '+wordsCount);
			w = parseInt(wordsCount.substring(7, 29));
			//console.log('w: '+w);
			var txt="";
			for(var i = 0; i < w; i++) {
				var r = Math.floor(Math.random() * lorem.length);
				//console.log('r: '+r);
				txt += lorem[r]+' ';
				//console.log('txt: '+txt);
			};
			return txt;
		};
		
	
	
		for(n=0; n < repeats; n++) {
			var randSelect = {};
			//set up array of random selections for each iteration:
			for(item in randomArray){
				randSelect[item] = Math.floor((Math.random() * randomArray[item].length));
			};
			//console.log(randSelect);
			
			
			var fname="", lname = "", email ="", l = "", odate = "", phone="", phone2 = "";
			var o = JSON.parse(jsonInput);
					console.dir('o:'+o);

			var j = {};
			Jobj = JSON.parse(jsonInput);//JSON.parse(JSON.stringify(jsonInput));
			console.log(Jobj);
			
			function FIRSTNAME() {
				return fname = randomArray.firstname[randSelect.firstname]
			};
	
			function LASTNAME() {
				return lname = randomArray.lastname[randSelect.lastname];
			}
	
			function COMPANY() {
				return cpmny = randomArray.company[randSelect.company];
			}
			
			fname = FIRSTNAME();
			lname = LASTNAME();
			cmpny = COMPANY();
			
			function EMAIL() {
				return email = fname + '.' + lname + '@' + cpmny + '.com';
			}
			
			function DATE(i1,i2) {
				i1 = moment(i1);
				i2 = moment(i2);
				if(isNaN(i1)) { i1 = i2 };
				if(isNaN(i2)) { i2 = i1 };
				//console.log(i1+' '+i2+' '+Math.random() * (i2 - i1));
				date = parseInt((Math.random() * (i2 - i1)) + i1);
				//console.log(date);
				//console.log(moment(i2).format('Do MM YY'));
				odate = moment(date).format('Do MMM YY');
				//console.log(odate);
				return odate;
			}
			
			function PHONE() {
				return phone = Math.floor((Math.random() * (9999999999 - 1000000000)) + 1000000000).toString();
			}
			function PHONE2() {
				return phone2 = '(' + phone.substr(0,3) + ') ' + phone.substr(3,3) + ' ' + phone.substr(6,4);
			}
	
			

			

			
			traverso = function() {
				traverse(o).forEach(function (x) {
					console.dir('o:'+o);
					if(/\<%(.*?)%>/.test(x)) {
						
						console.log('we are in!')
						//console.log(x);
						if(/FIRSTNAME/.test(x)) {
							FIRSTNAME();
							//console.log(fname);
							//y = x.replace('FIRSTNAME', fname);
							//console.log(y);
						}
						if(/LASTNAME/.test(x)) {
							LASTNAME();
							//y = x.replace('LASTNAME', lname);
							//console.log(y);
						}
						if(/EMAIL/.test(x)) {
							EMAIL();
							//y = x.replace('EMAIL', email);
							//console.log(y);
						}
						if (/\<%INT(.*?)%\>/.test(x)) {
							//console.log("INNNNNT");
							u = /\<%(INT.*?)%\>/.exec(x);
							eval(u[1]);
							//console.log(u);
							//this.update(y);
							};
							
						if(/\<%DATE(.*?)%>/.test(x)) {console.log('match')
							p = /\<%(DATE.*?)%>/.exec(x);
							//console.log(p[1]);
							eval(p[1]);
							
							//this.update(odate);
							
						};
						if(/PHONE/.test(x)) {
							 PHONE();
						};
						if(/PHONE2/.test(x)) {
							 PHONE2();
						};
						
						var a = x.replace(/<%FIRSTNAME%>/g, fname);
						var b = a.replace(/<%LASTNAME%>/g, lname);
						var c = b.replace(/<%EMAIL%>/g, email);
						var d = c.replace(/(<%INT(.*?)%>)/g, l);
						var e = d.replace(/(<%DATE(.*?)%>)/g, odate);
						var f = e.replace(/<%PHONE%>/g, phone);
						var g = f.replace(/<%PHONE2%>/g, phone2);

						this.update(g);
						

					}
					
				});
				return o;
			}
			
			o = traverso();
			
			x = o;


			
			finaloutput[n] = x;
		//console.log('final[n]: '+finaloutput[1]);
			
		};
		
		 //var finalOutput = JSON.stringify(final).replace(',','hello');
		
		output = JSON.stringify(finaloutput);
		console.log('output: '+output);
		res.send(output);
		 //document.getElementById('resultText').innerHTML = repeats + ' sub-objects generated in JSON';
		// document.getElementById('outputPane').focus();
		// document.getElementById('outputPane').select();
	
		//$('#generating').addClass('not-generating').removeClass('generating');
		//$('#buttonGenerate').html('generate');
		console.log('finished');

	//}
}