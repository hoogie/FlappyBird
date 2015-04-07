'use strict';
var music = document.getElementById('music');
 
function playAudio() {
	
	if (music.muted) {
		music.muted = false;
		music.play();
		pButton.className = 'play';
	} else {
		music.muted = true;
		pButton.className = 'mute';
	}
}



