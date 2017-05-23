var STDTIME = 1500;
var FAILLIMIT = 2;

var musicon = true;
var dict = 0;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function firstrun() {
	dict = new Set();
	for (var i = 0; i < di.length; i++) {
		if (di[i].length > 2) {
			dict.add(di[i]);
		}
	}	
	home();
}

function howtoplay() {
	$("#screen").html("<minor>Wordist is a word building game in essence. Here are its (very simple) rules:<br>\
			<table>\
			<tr><td><asis2>1.</asis2></td><td><asis>You start with a letter displayed on the screen</asis></td></tr>\
			<tr><td><asis2>2.</asis2></td><td><asis>At each step you select a letter from the list below (a..z) to add at the end</asis></td></tr>\
			<tr><td><asis2>3.</asis2></td><td><asis>Your goal is to make a suffix of the new string a valid english word. For example, if you add a 'd' at the end of 'quarad', you get 'quaradd' with 'add' as a suffix.</asis></td></tr>\
			<tr><td><asis2>4.</asis2></td><td><asis>For each word as a suffix you get 1 point. If your letter addition creates multiple valid suffixes, you score multiple points. For the first word you get 1, for the second 4, for the third 16, and so on.</asis></td></tr>\
			<tr><td><asis2>5.</asis2></td><td><asis>If you fail to create a valid suffix for 2 consecutive moves, you lose.</asis></td></tr>\
			</table>\
			To return to main menu (from here and anywhere), click/tap the <font color='blueviolet'>Wordist</font>.\
			</minor>");	
}
		

function check(s) {
	return (dict.has(s));
}


function isAlpha(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function home() {
	$("#screen").html("<center><table><tr><td><minor>1. </minor></td><td><cble><minor onclick='newgame()'>New Game</minor></cble></td></tr>\
			<tr><td><minor>2.</minor></td><td><cble><minor onclick='howtoplay()'>How to Play</minor></cble></td></tr>\
			<tr><td><minor>3.</minor></td><td><cble><minor onclick='toggle()'>Music Toggle</minor></cble></td></tr>\
			<tr><td><minor>4.</minor></td><td><cble><minor onclick='about()'>About</minor></cble></td></tr></table></center>");
	
	
		
	//dict = new Typo("en_US",false, false, { dictionaryPath: "Typo.js/typo/dictionaries" });
	
}

function about() {
	$("#screen").html("<asis><font color='blueviolet'>Wordist</font> is designed and written by Mriganka Basu Roy Chowdhury. Music used is composed by <a href='http://www.purple-planet.com'>Purple Planet</a>. Font used is Chasing Hearts by <a href='https://mistifonts.com/'> Misti's Fonts</a>. This game was created solely for creative purposes, and does not involve any sort of commercial profit whatsoever.</asis>");
}

function toggle() {
	if (musicon) {
		musicon = false;
		$("#musics").html("");
	} else {
		musicon = true;
		$("#musics").html("<audio src='First Steps.mp3' autoplay loop></audio>");
	}
}

function getStyleText(s, l, r) {
	
	var t = "<center><asis>";
	for (var i = 0; i < l; i++) {
		t += s[i];
	}
	t += "<highword>";
	for (var i = l; i <= r; i++) {
		t += s[i];
	}
	t += "</highword>";
	for (var i = r+1; i < s.length; i++) {
		t += s[i];
	}
	t += "</asis></center>";
	return t;
}

function reset() {
	curstr = "";
	curscore = 0;
}

var oklist = ['a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','r','s','t','u','v','w','y','z'];

function randomchar() {
	return oklist[Math.floor(Math.random()*oklist.length)];
}

var failed = 0;
var curstr = "";
var curscore = 0;


function newgame() {
	curscore = 0;
	failed = 0;
	curstr = randomchar();
	$("#score").html(getScore());
	getScreen();
}

function animate(hl,sc) {
	$("#screen").html(getStyleText(curstr,hl[0],curstr.length-1));
	curscore+=sc;
	$("#score").html(getScore());
	hl.shift();
	if (hl.length <= 0) { setTimeout(function() { $("#score").html(getScore()); getScreen(); }, STDTIME); }
	else { setTimeout(function() { animate(hl,sc*4); }, STDTIME); }
}

function keyed(e) {
	curstr += e;
	var hl = [];
	
	for (var i = curstr.length - 1; i >= 0; i--) {
		if (check(curstr.substring(i,curstr.length))) {
			hl.push(i);
		}
	}
	
	if (hl.length > 0) {
		animate(hl,1);
		failed = 0;
	} else {
		failed++;
		if (failed >= FAILLIMIT) {
			$("#screen").html("<center><major2>Game Over</major2></center>");
			return;
		}
		$("#score").html(getScore());
		getScreen();
	}
}

function getScreen() {
	$("#screen").html("<center><minor>"+curstr+"</minor><div id ='charscroll'></div></center>");
	nextScroll();
}


function getScore() {
	var st = "<center><minor style='color:crimson'>Score:&nbsp;&nbsp;&nbsp;</minor><asis>"+curscore+"&nbsp;&nbsp;("+failed+")"+"</asis>";
	return st;
}


/*Character scrolls*/

var ls = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function nextScroll() {
		
	for (var i = 97; i <= 97+25; i++) {
		var c = String.fromCharCode(i);
		$("#charscroll").append("<cscur onclick=\"keyed('"+c+"')\"><cble><asis>"+c+"</asis></cble></cscur>&nbsp;&nbsp;");
	}
	
	/* curc += 1;
	 if (curc >= ls.length) curc = 0;
	 $("#charscroll").html("<cscroll><table><tr><td><cscur id='scroller' onclick='nextScroll()'><cble><minor>("+ls[curc]+")</minor></cble>\
	                 </cscur></td><td><cble><csbut onclick='getchar()'><minor>&#10003;</minor></csbut></cble></td></tr></table></cscroll>");	
	
	 var timeoutId = 0; 
	 $('#scroller').on('mousedown', function() {
	     timeoutId = setTimeout(nextScroll, 1000);
	     }).on('mouseup mouseleave', function() {
	         clearTimeout(timeoutId);
	  });*/
}

function getchar() {
	keyed(ls[curc]);
}