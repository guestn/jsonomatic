
$(document).ready(function(){




	
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/javascript");

function selectElementContents(el) {
	console.dir(el);
	el.focus();
	el.select();
};



$("#buttonGenerate").on('click', function(){
	
	$('#outputPane').val('generating...');
	
	output = editor.getValue();
	var Jobj = JSON.stringify(output)
	output = output.trim();
	
	repeats = $('#repeats').val();
	//data = Jobj;
	//output = JSON.parse('{ "first":"<%FIRSTNAME%>", "last":"<%LASTNAME%>" }');
	console.log(output);
    //$.post("/submit", data, function(data, status){
    //    alert("Data: " + data + "\nStatus: " + status);
   // });
    $.ajax({
	  type: "POST",
	  url: '/submit',
	  data: {output: output, repeats: repeats},
	 // contentType: "application/json; charset=utf-8",
	  //success: success,
	  dataType: 'text'
	}).success(function(data){
		console.log(data);
		data = JSON.parse(data);
		data = JSON.stringify(data,  null, 4);
		$('#outputPane').val(data);
		//selectElementContents('#outputPane');
	});;
    
});

$("#buttonSelectAll").on('click', function(){
	$('#outputPane').select();
});


});

/*
function generate() {   

	//$('#generating').addClass('generating').removeClass('not-generating');
	//$('#buttonGenerate').html('....');
	
    var output = editor.getValue();
    var Jobj = JSON.parse(output); 
    //console.log(Jobj);
    
    //initialise the random arrays:
	var firstname = ["John","James","Joe"];
	var lastname = ["Smith","Jones","Brown","Davis"];
	var company = ["Newdex","Zaamtom","Silvertech","Drillcon","Wepco"];
	
	var lorem = ["ipsum","dolor","it","amet","consectetur","adipisicing","elit","sed" ];
	
	var randomArray = { firstname: firstname, lastname: lastname, company: company };
		
	var repeats = document.getElementById('repeats').value;	


	var final = [];
	
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
	
	function DATE(start, end) {
		
		
		return dte;
	}


	for(n=0;n<repeats;n++) {
		var randSelect = {};
		//set up array of random selections for each iteration:
		for(item in randomArray){
			randSelect[item] = Math.floor((Math.random() * randomArray[item].length));
		};
		//console.log(randSelect);
		
		
		var fname="", lname = "", email ="", l = "", odate = "", phone="", phone2 = "";
		var o = Jobj;
		var j = {};
		Jobj = JSON.parse(JSON.stringify(Jobj));
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
			console.log(i1+' '+i2+' '+Math.random() * (i2 - i1));
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

		
		phone2 = '(' + phone.substr(0,3) + ') ' + phone.substr(3,3) + ' ' + phone.substr(6,4);
		
		var traverse = require('traverse');
		
		traverse(o).forEach(function (x) {
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
					console.log("INNNNNT");
					u = /\<%(INT.*?)%\>/.exec(x);
					eval(u[1]);
					console.log(u);
					//this.update(y);
					};
					
				if(/\<%DATE(.*?)%>/.test(x)) {console.log('match')
					p = /\<%(DATE.*?)%>/.exec(x);
					console.log(p[1]);
					eval(p[1]);
					
					//this.update(odate);
					
				};
				if(/PHONE/.test(x)) {
					 PHONE();
				};
				if(/PHONE2/.test(x)) {
					 PHONE2();
				};
				
				a = x.replace('<%FIRSTNAME%>', fname);
				b = a.replace('<%LASTNAME%>', lname);
				c = b.replace('<%EMAIL%>', email);
				d = c.replace(/(<%INT(.*?)%>)/, l);
				e = d.replace(/(<%DATE(.*?)%>)/, odate);
				f = e.replace('<%PHONE%>', phone);
				g = f.replace('<%PHONE2%>', phone2);
				this.update(g);
				
			}
			
		});
		

		final[n] = o;
		
		
	};
	
	 var finalOutput = JSON.stringify(final).replace(',','hello');
	
	 document.getElementById('outputPane').value = JSON.stringify(final);
	 //document.getElementById('resultText').innerHTML = repeats + ' sub-objects generated in JSON';
	 document.getElementById('outputPane').focus();
	 document.getElementById('outputPane').select();

	//$('#generating').addClass('not-generating').removeClass('generating');
	//$('#buttonGenerate').html('generate');
	console.log('finished');
};




function selectElementContents(el) {
	console.dir(el);
	el.focus();
	el.select();
};

var element = document.getElementById("outputPane");

//$('#buttonGenerate').on('click', dothis);



function classy() {
	$('#buttonGenerate').addClass('generating');
	$('#numdone').text('WORKING........');
};

var dfd = $.Deferred();

dfd.done(classy, generate);


/*$('#buttonGenerate').on('click', function() {
	//dfd.resolve();

        (function(cont){
            $('#numdone').text('Processing JQ...');  
            start = new Date();
            end = generate();
            setTimeout(cont, 500);
        }) function(){
            do {start = new Date();} while (end-start > 0);
            $('#numdone').text('Finished JQ');   
        }


});


	$(function() {
            $('#buttonGenerate').on('click', function(){
                (function(cont){
                    $('span#numdone').html('Processing JQ...');  
                    start = new Date();
                    end = generate();
                    setTimeout(cont, 100);
                })(function(){
                    do {start = new Date();} while (end-start > 0);
                    $('span#numdone').html('Finished JQ');   
                })
            });
    });
*/




