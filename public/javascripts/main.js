
$(document).ready(function(){

	/*ace editor setup*/
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/twilight");
	editor.getSession().setMode("ace/mode/javascript");
	

	/*slide utilbox*/
	$('.utilbox').on('click', function(e){
		$('#typesDescr').toggleClass('slideIn');
	});
	

	/*generate objects*/
	$("#buttonGenerate").on('click', function(e){
		e.preventDefault;
		$('#outputPane').val('generating...');
		
		/*get all the relevant values from the editor and input box*/
		var output = editor.getValue();
		var Jobj = JSON.stringify(output)
		var output = output.trim();		
		var repeats = $('#repeats').val();
		
		/*fire it to the backend*/
	    $.ajax({
		  type: "POST",
		  url: '/submit',
		  data: {output: output, repeats: repeats},
		  //success: success,
		  dataType: 'text'
		}).success(function(data){
			console.log(data);
			data = JSON.parse(data);
			data = JSON.stringify(data,  null, 4);
			$('#outputPane').val(data);
			
			$('#statusBar').text(repeats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' objects added successfully')
			$('#statusBar').stop().fadeIn(1000).delay(4000).fadeOut(1000);
		});
	    
	});
	
	
	/*select output*/
	$("#buttonSelectAll").on('click', function(){
		$('#outputPane').select();
	});


	/*smoothscroll*/
	$(function() {
		  $('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
		    }
		  });
		});
		
	
	/*animated text pre boxes*/
	var str = '<p>> "name": { "first":"&lt;%FIRSTNAME%&gt;", "last":"&lt;%LASTNAME%&gt;"},</p>',
    i = 0,
    isTag,
    text;

	function type() {
	    text = str.slice(0, ++i);
	    if (text === str) return;
	    
	    $('.explainBox').html(text);
	    var char = text.slice(-1);
	    if( char === '<' ) isTag = true;
	    if( char === '>' ) isTag = false;
	
	    if (isTag) return type();
	    setTimeout(type, 80);
	};
	type();


});

