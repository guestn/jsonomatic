(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Applications/MAMP/htdocs/objectgenerator/main.js":[function(require,module,exports){
	
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/javascript");


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


});*/


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



$('#buttonSelectAll').on('click', selectElementContents(element));

},{"traverse":"/Applications/MAMP/htdocs/objectgenerator/node_modules/traverse/index.js"}],"/Applications/MAMP/htdocs/objectgenerator/node_modules/traverse/index.js":[function(require,module,exports){
var traverse = module.exports = function (obj) {
    return new Traverse(obj);
};

function Traverse (obj) {
    this.value = obj;
}

Traverse.prototype.get = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            node = undefined;
            break;
        }
        node = node[key];
    }
    return node;
};

Traverse.prototype.has = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            return false;
        }
        node = node[key];
    }
    return true;
};

Traverse.prototype.set = function (ps, value) {
    var node = this.value;
    for (var i = 0; i < ps.length - 1; i ++) {
        var key = ps[i];
        if (!hasOwnProperty.call(node, key)) node[key] = {};
        node = node[key];
    }
    node[ps[i]] = value;
    return value;
};

Traverse.prototype.map = function (cb) {
    return walk(this.value, cb, true);
};

Traverse.prototype.forEach = function (cb) {
    this.value = walk(this.value, cb, false);
    return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
    var skip = arguments.length === 1;
    var acc = skip ? this.value : init;
    this.forEach(function (x) {
        if (!this.isRoot || !skip) {
            acc = cb.call(this, acc, x);
        }
    });
    return acc;
};

Traverse.prototype.paths = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.path); 
    });
    return acc;
};

Traverse.prototype.nodes = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.node);
    });
    return acc;
};

Traverse.prototype.clone = function () {
    var parents = [], nodes = [];
    
    return (function clone (src) {
        for (var i = 0; i < parents.length; i++) {
            if (parents[i] === src) {
                return nodes[i];
            }
        }
        
        if (typeof src === 'object' && src !== null) {
            var dst = copy(src);
            
            parents.push(src);
            nodes.push(dst);
            
            forEach(objectKeys(src), function (key) {
                dst[key] = clone(src[key]);
            });
            
            parents.pop();
            nodes.pop();
            return dst;
        }
        else {
            return src;
        }
    })(this.value);
};

function walk (root, cb, immutable) {
    var path = [];
    var parents = [];
    var alive = true;
    
    return (function walker (node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};
        
        var keepGoing = true;
        
        var state = {
            node : node,
            node_ : node_,
            path : [].concat(path),
            parent : parents[parents.length - 1],
            parents : parents,
            key : path.slice(-1)[0],
            isRoot : path.length === 0,
            level : path.length,
            circular : null,
            update : function (x, stopHere) {
                if (!state.isRoot) {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
                if (stopHere) keepGoing = false;
            },
            'delete' : function (stopHere) {
                delete state.parent.node[state.key];
                if (stopHere) keepGoing = false;
            },
            remove : function (stopHere) {
                if (isArray(state.parent.node)) {
                    state.parent.node.splice(state.key, 1);
                }
                else {
                    delete state.parent.node[state.key];
                }
                if (stopHere) keepGoing = false;
            },
            keys : null,
            before : function (f) { modifiers.before = f },
            after : function (f) { modifiers.after = f },
            pre : function (f) { modifiers.pre = f },
            post : function (f) { modifiers.post = f },
            stop : function () { alive = false },
            block : function () { keepGoing = false }
        };
        
        if (!alive) return state;
        
        function updateState() {
            if (typeof state.node === 'object' && state.node !== null) {
                if (!state.keys || state.node_ !== state.node) {
                    state.keys = objectKeys(state.node)
                }
                
                state.isLeaf = state.keys.length == 0;
                
                for (var i = 0; i < parents.length; i++) {
                    if (parents[i].node_ === node_) {
                        state.circular = parents[i];
                        break;
                    }
                }
            }
            else {
                state.isLeaf = true;
                state.keys = null;
            }
            
            state.notLeaf = !state.isLeaf;
            state.notRoot = !state.isRoot;
        }
        
        updateState();
        
        // use return values to update if defined
        var ret = cb.call(state, state.node);
        if (ret !== undefined && state.update) state.update(ret);
        
        if (modifiers.before) modifiers.before.call(state, state.node);
        
        if (!keepGoing) return state;
        
        if (typeof state.node == 'object'
        && state.node !== null && !state.circular) {
            parents.push(state);
            
            updateState();
            
            forEach(state.keys, function (key, i) {
                path.push(key);
                
                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
                
                var child = walker(state.node[key]);
                if (immutable && hasOwnProperty.call(state.node, key)) {
                    state.node[key] = child.node;
                }
                
                child.isLast = i == state.keys.length - 1;
                child.isFirst = i == 0;
                
                if (modifiers.post) modifiers.post.call(state, child);
                
                path.pop();
            });
            parents.pop();
        }
        
        if (modifiers.after) modifiers.after.call(state, state.node);
        
        return state;
    })(root).node;
}

function copy (src) {
    if (typeof src === 'object' && src !== null) {
        var dst;
        
        if (isArray(src)) {
            dst = [];
        }
        else if (isDate(src)) {
            dst = new Date(src.getTime ? src.getTime() : src);
        }
        else if (isRegExp(src)) {
            dst = new RegExp(src);
        }
        else if (isError(src)) {
            dst = { message: src.message };
        }
        else if (isBoolean(src)) {
            dst = new Boolean(src);
        }
        else if (isNumber(src)) {
            dst = new Number(src);
        }
        else if (isString(src)) {
            dst = new String(src);
        }
        else if (Object.create && Object.getPrototypeOf) {
            dst = Object.create(Object.getPrototypeOf(src));
        }
        else if (src.constructor === Object) {
            dst = {};
        }
        else {
            var proto =
                (src.constructor && src.constructor.prototype)
                || src.__proto__
                || {}
            ;
            var T = function () {};
            T.prototype = proto;
            dst = new T;
        }
        
        forEach(objectKeys(src), function (key) {
            dst[key] = src[key];
        });
        return dst;
    }
    else return src;
}

var objectKeys = Object.keys || function keys (obj) {
    var res = [];
    for (var key in obj) res.push(key)
    return res;
};

function toS (obj) { return Object.prototype.toString.call(obj) }
function isDate (obj) { return toS(obj) === '[object Date]' }
function isRegExp (obj) { return toS(obj) === '[object RegExp]' }
function isError (obj) { return toS(obj) === '[object Error]' }
function isBoolean (obj) { return toS(obj) === '[object Boolean]' }
function isNumber (obj) { return toS(obj) === '[object Number]' }
function isString (obj) { return toS(obj) === '[object String]' }

var isArray = Array.isArray || function isArray (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

forEach(objectKeys(Traverse.prototype), function (key) {
    traverse[key] = function (obj) {
        var args = [].slice.call(arguments, 1);
        var t = new Traverse(obj);
        return t[key].apply(t, args);
    };
});

var hasOwnProperty = Object.hasOwnProperty || function (obj, key) {
    return key in obj;
};

},{}]},{},["/Applications/MAMP/htdocs/objectgenerator/main.js"]);


///////////////////////////


		//traverso:
		/*function traverse(o,func) {
			
		    for (var i in o) {
		        func.apply(this,[i,o[i]]);  
		        if (o[i] !== null && typeof(o[i])=="object") {
		            //going one step down in the object tree!!
		            traverse(o[i],func);
		        }
		    }
		}
		//called with every property and its value
		function process(key,value) {
		
		    //console.log(key + " : "+value);
		    if(value == "<%FIRSTNAME%>") {
			    console.log('true');
			    fname = randomArray.firstname[randSelect.firstname];
			    o[key] = fname;
			    console.log(this);
			    console.log( 'o[key] '+ o[key]);
		    };
		    if(value == "<%LASTNAME%>") {
				lname = randomArray.lastname[randSelect.lastname];
			    o[key] = lname;
			     
		    };
		    if(value == "<%EMAIL%>") {
			    o[key] = fname + '.' + lname + '@' + randomArray.company[randSelect.company] + '.com';
			     
		    };
		    
		}
		//that's all... no magic, no bloated framework
		traverse(o,process);*/
