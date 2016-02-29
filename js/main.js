var counter = 0;

function init() {
	var username = readCookie("username");
	var blackjacks = parseInt(readCookie("blackjacks")); // convert string into integer

	console.log("[d] username=" + username);
	console.log("[d] blackjacks=" + blackjacks);

	if ( (username != null) && (blackjacks != null) ) {
		console.log("[d] Cookies found!");
		alert("Hello " + username + ". You have done " + blackjacks + " blackjacks!");
	} else {
		console.log("[d] No cookie found...");
		username = prompt("What is your username?");
		writeCookie("username", username);
		writeCookie("blackjacks", 0);
	}
}

function getPoint(card) {
	if (card == 1)// ace
		return 11;
	else if (card >= 2 && card < 11) // between 2 and 10
		return card;
	else // jack, queen, king
		return 10;
	
}

function deal(form) {
	var card1 = Math.floor( (Math.random() * 13) + 1 );
	var card2 = Math.floor( (Math.random() * 13) + 1 );

	var point1 = getPoint(card1);
	var point2 = getPoint(card2);

	var total = point1 + point2;
	if (total == 22) // 2 aces
		total = 12;

	counter++;

	document.images[0].src = "img/" + card1 + "hearts.jpg";
	document.images[1].src = "img/" + card2 + "hearts.jpg";

	form[0].value = point1;
	form[1].value = point2
	form[2].value = total;
	form[3].value = counter;

	if (total == 21) { // black jack!
		console.log("[d] Increment the number of blackjacks");
		writeCookie("blackjacks", parseInt(readCookie("blackjacks")) + 1); // increment the number of blackjacks
		alert("Black Jack! Congratulations!");
	}
}

function writeCookie(name, value) {
	var date = new Date();
	date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 30)); // expire in 1 month
	var expires = "; expires=" + date.toGMTString();
	document.cookie = name + "=" + value + expires;
}

function readCookie(name) {
	var name = name + "=";
	var cookies = document.cookie.split(";");
	for (var i = 0, max = cookies.length; i < max; i++) {
		var cookie = cookies[i];
		while (cookie.charAt(0) == " ") // remove spaces
			cookie = cookie.substring(1, cookie.length);
		if (cookie.indexOf(name) == 0) // if cookie is found
			return cookie.substring(name.length, cookie.length);
	}
	return null;
}