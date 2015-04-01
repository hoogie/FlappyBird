var music = document.getElementById('music');
 
function playAudio() {
	music.volume = 0.5;
	if (music.muted) {
		music.muted = false;
		music.play();
		pButton.className = "play";
	}else { 
		music.muted = true;
		pButton.className = "mute";
	}
}


/*function toggleSound(img)
{
   img.src= img.src=="http://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/500px-Speaker_Icon.svg.png" ? "https://cdn2.iconfinder.com/data/icons/picons-essentials/57/music_off-512.png" : "http://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/500px-Speaker_Icon.svg.png";
}*/

