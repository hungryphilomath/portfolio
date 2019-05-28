$(document).ready(function(){
	
	///////ONLOAD CODE
	/* Bootstrap scroll spy adds 'active' class to the <li> elements with a child <a>
	containing href linking to the section or div currently in view */
	$('#home').scrollspy({target:'nav',offset:200});
	
	
	const today = new Date();
	$('#experience-years').text(today.getFullYear() - 2015);

	/* Bootstrap affix applies 'affix' class to #profilePhoto and .skillBars elements.
	Affix class shrinks and moves #profilePhoto to the navbar, and increases the width of
	.skillBar to the desired width. */
	$('#profilePhoto').affix({
		offset:{
			top: ($('#profilePhoto').offset().top - $('nav').outerHeight() - 5)
		}
	});
	$('#skills .skillBar').affix({
		offset: {
			top: ($('#skills').offset().top - 700)
		}
	});

	////////BINDED FUNCTIONS
	/* focus on #editable element when laptop screen clicked
	to allow user to edit colors */
	$('.laptopScreenEditor').click(function(){
		$('#editable').focus();
	});

	/* Nav "burger" menu button */
	$('.navBurger').click(function(){
		$(this).toggleClass('open');
		$('nav').toggle('slide', {direction:'right'});
	});

	/* Smooth scrolling when navbar <li> element clicked */
	$('.myNavbar li, #profile .contact').click(function(e){
		//prevent default behaviour of page jumping direclty to link
		e.preventDefault();
		//get ID of target section
		var clickedId = $(this).children('a').attr('href');
		//get y coordinates of top of targetted section
		var clickedIdY = $(clickedId).offset().top;
		var scrollPosition = clickedIdY;
		// if mobile navbar
		if($('nav').width() === 175){
			//remove 'open' class from burger menu to switch from X to burger
			$('.navBurger').removeClass('open');
			//hide mobile navbar
			$('nav').toggle('slide',{direction:'right'});
		} else{
			//get height of navbar with padding
			var navbarHeight = $('nav').outerHeight();
			//subtract navbar height from scrollPosition so target section appears below navbar
			scrollPosition -= navbarHeight;
		}
		//smooth scroll to scrollPosition (jquery UI plugin required)
		$('html, body').animate({scrollTop: scrollPosition},1250,'easeInOutExpo');
	});

	/* function that responds to user input in #editable in laptop in #top */
	$('#editable').keyup(function(){
		var background = '#24344b',color = 'white';
		//split the input using semicolons
		var x = $('#editable').text().split(';');
		//for all strings separated by semicolons
		for (var i=0; i<x.length; i++){
			//if it contains 'background:' string at start
			if(x[i].indexOf('background:') === 0){
				//background = the value after the 11 characters of string 'background:'
				background = x[i].slice(11);
			} else if(x[i].indexOf('background-color:') === 0){
				//do the same if 'background-color:' is defined instead
				background = x[i].slice(17);
			} else if(x[i].indexOf('color:') === 0){
				//and the same for 'color:''
				color = x[i].slice(6);
			}
		}
		if(background.slice(0,1) === ' '){
			//if space was entered after the colon remove it
			background = background.slice(1)
		}
		if(color.slice(0,1) === ' '){
			//if space was entered after the colon remove it
			color = color.slice(1)
		}
		//set the background and text colors to those extracted from user input
		$('body').css({'background':background,'color':color});
	})

	/* TODO: replace this array with backend AJAX GET request */
	var showcaseArray = [
		{	"h1":"6 Degrees Of Kevin Bacon",
			"h2":"Web App",
			"p":["This is a web app game in which the player must connect randomly selected actors to Kevin Bacon through films and other actors.","I developed the app using HTML, CSS and JQuery, and it makes AJAX requests to the tmdb API to get actor and movie information."],
			"img": "img/bacon.jpg",
			"a":"http://6degreesofkevinbacon.gq"
		},
		{	"h1":"Karkade Fashion Line",
			"h2":"AngularJS Website",
			"p":["Karkadé is an indie clothing and fashion line of home-made, bespoke garments, hand-made in Khartoum, Sudan.","I created the website using angular.js and wordpress and also created the design using fonts and a color scheme provided by the client."],
			"img": "img/karkade.jpg",
			"a":"http://karkade.cf"
		},
		{	"h1":"Rowfer Ltd.",
			"h2":"Wordpres Website",
			"p":["Rowfer ltd. is a mining materials and equipment distribution company based in London. The client wanted me to design and code a new version of their website and required a mobile-first, responsive, single page website with IE8 upwards compatibility. These requirements were to cater for their customers located in regions with slow internet access, and those that use older browsers.","I designed the webpage with a black and grey color scheme to give the effect of being in a mine. I made sure these colors matched their orange logo and used to used a 'strong' serif font to reflect the toughness of a mining environment."],
			"img":"img/rowfer.jpg",
			"a":"http://www.rowferltd.com"
		},
		{	"h1":"Reniam Property Development",
			"h2":"Wordpres Website",
			"p":["Reniam ltd. is a property development firm based in London. They approached me to update their existing website to a responsive, wordpress design and to encorporate a better method of contacting them. The color scheme and fonts were provided by a design firm, but the website was designed and coded by me."],
			"img":"img/reniam.jpg",
			"a":"http://reniam.com"
		},
		{	"h1":"Yumna Mohamed Portfolio",
			"h2":"Wordpres Website",
			"p":["Yumna Mohamed is a stand-up comedian, journalist, writer and photographer. She required a responsive, wordpress website with a black and white scheme.  We worked on the design together, communicating via emails and messaging services as she was abroad on an assignment at the time."],
			"img": "img/yumna.jpg",
			"a":"http://yumphoria.ml"
		},
		{	"h1":"Website Challenge",
			"p":["The 'website challenge' was a personal challenge I set myself when I first started developing websites. It was to create 20 websites from Photoshop document files to prove to the world that I was a capable developer, since at that point I had no work experience in the field."],
			"a":"/challenge"
		}]

	/* function that populates .modal with appropriate content from
	JSON packet 'showcaseArray' based on clicked .imageContainer */
	$(".showcaseItem .imageContainer").click(function(){
		var i = $(this).parents('.wrapper').index('.wrapper')-1;
		$('.modal h1').text(showcaseArray[i].h1);
		$('.modal img').attr('src',showcaseArray[i].img);
		$('.modal .paragraphs').html('');
		for(var x=0;x<showcaseArray[i].p.length;x++){
			$('.modal .paragraphs').append('<p>'+showcaseArray[i].p[x]+'</p>');
		}
		$('.modal a').attr('href',showcaseArray[i].a);
		$('.modal').modal('show');
	});

})
