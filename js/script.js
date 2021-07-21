/*
 * closes collapsable menu if user clicks off of it
 */
 $(function () {
   $("button.navbar-toggler").blur(function (event) {
     var screenWidth = window.innerWidth;
     if (screenWidth < 768 && $("#navigation-content:hover").length == 0) {
       $("#navigation-content").collapse('hide');
     }
   });

   //forces focus on click
   $("button.navbar-toggler").click(function (event) {
     $(event.target).focus();
   });
 });

/*
 * on page load, adds event listeners to all items with interactive behavior
 */
document.addEventListener("DOMContentLoaded", function(){
  if(document.querySelector("#home") != null){
    /*
     * creates array of 3 music objects
     * each object represents the state of a music player
     */
    window.albums = [{album: "Navi Vahurani",
                     id: "navi-vahurani",
                     trackNumber: 0,
                     fileNames: ["01-Shlok.mp3",
                                 "02-Muratiyo-Shodhta.mp3",
                                 "03-Chali-Varrajani.mp3",
                                 "04-Mumbai-Shaherno.mp3",
                                 "05-Ek-Rangilo-Mor.mp3",
                                 "06-Kan-Chheta-Chheta.mp3",
                                 "07-Navi-Vahurani.mp3",
                                 "08-Dudh-Makhan-Sama.mp3",
                                 "09-Varraja-Aaje.mp3",
                                 "10-Tame-Paino-Pan.mp3",
                                 "11-Vhali-Dikri.mp3"],
                      trackNames: ["Shlok",
                                   "Muratiyo Shodhta",
                                   "Chali Varrajani",
                                   "Mubai Shaherno",
                                   "Ek Rangilo Mor",
                                   "Kan Chheta Chheta",
                                   "Navi Vahurani",
                                   "Dudh Makhan Sama",
                                   "Varraja Aaje",
                                   "Tame Paino Pan",
                                   "Vhali Dikri"]},

                     {album: "Madhoshi",
                     id: "madhoshi",
                     trackNumber: 0,
                     fileNames: ["01-Track-1.mp3",
                                 "02-Track-2.mp3",
                                 "03-Track-3.mp3",
                                 "04-Track-4.mp3",
                                 "05-Track-5.mp3",
                                 "06-Track-6.mp3",
                                 "07-Track-7.mp3",
                                 "08-Track-8.mp3",
                                 "09-Track-9.mp3",
                                 "10-Track-10.mp3",
                                 "11-Track-11.mp3",
                                 "12-Track-12.mp3"],
                      trackNames: ["Evi Ada Ajmavu",
                                  "Tamne Hu Game Chhu",
                                  "Andharya Ava",
                                  "Mane Aa Te Shun",
                                  "Madhoshibharyu",
                                  "Chhupavi Na Shaki",
                                  "Hu Mara Mahelni",
                                  "Ek Maru Ne",
                                  "Tame Amane Dilthi",
                                  "Mara Piya Pardesh",
                                  "Tamne Yad Kari",
                                  "Samay Ghadik"]},

                     {album: "Balmaa",
                     id: "balmaa",
                     trackNumber: 0,
                     fileNames: ["01-Track-1.mp3",
                                 "02-Track-2.mp3",
                                 "03-Track-3.mp3",
                                 "04-Track-4.mp3",
                                 "05-Track-5.mp3",
                                 "06-Track-6.mp3",
                                 "07-Track-7.mp3",
                                 "08-Track-8.mp3"],
                     trackNames: ["Saraswati Vandana",
                                  "Raag Gavati",
                                  "Raag Puriya Dhanashree",
                                  "Raag Madhuvanti",
                                  "Piya Mohe Chhod Gayo",
                                  "Khabariyaa Bheju",
                                  "Nadiya Kinaare Ek Bangalaa",
                                  "Raag Darbari"]}];

    //on page load, adds first track to each audio player
    for(var i = 0; i < window.albums.length; i++){
      //updates audio with first track
      var currAlbum = window.albums[i]["id"];
      var audioHTML = "<audio class='audio-player' src='audio/" + currAlbum + "/" + window.albums[i]["fileNames"][0] + "'></audio>";
      var audioContainer = document.querySelector("#" + currAlbum + " .audio-container");
      audioContainer.innerHTML = audioHTML;

      //updates track title
      var trackName = window.albums[i]["trackNames"][0];
      var trackTitle = document.querySelector("#" + currAlbum + " .song-title");
      trackTitle.innerText = trackName;

      //updates timestamp
      var audio = document.querySelector("#" + currAlbum + " audio");
      audio.addEventListener("loadedmetadata", function(){
        for(var j = 0; j < window.albums.length; j++){
          if(document.getElementById(window.albums[j]["id"]).contains(this)){
            updateTimeOnPlay(window.albums[j]["id"]);
          }
        }
      });
    }

    //adds event listener to next track
    //changes to next track on click
    var nextTrackButtons = document.getElementsByClassName("next-track");
    for(var i = 0; i < window.albums.length; i++){
      nextTrackButtons[i].addEventListener("click", function(){
        for(var j = 0; j < window.albums.length; j++){
          if(document.getElementById(window.albums[j]["id"]).contains(this)){
            //updates track number
            var currAlbum = window.albums[j];
            var track = currAlbum["trackNumber"];
            track = (track + 1) % currAlbum["fileNames"].length;
            currAlbum["trackNumber"] = track;

            //updates audio
            var audioHTML = "<audio class='audio-player' src='audio/" + currAlbum["id"] + "/" + currAlbum["fileNames"][track] + "'></audio>";
            var audioContainer = document.querySelector("#" + currAlbum["id"] + " .audio-container");
            audioContainer.innerHTML = audioHTML;

            //updates track title
            var trackName = currAlbum["trackNames"][track];
            var trackTitle = document.querySelector("#" + currAlbum["id"] + " .song-title");
            trackTitle.innerText = trackName;

            //updates timestamp
            var audio = document.querySelector("#" + currAlbum["id"] + " audio");
            audio.addEventListener("loadedmetadata", function(){
              for(var j = 0; j < window.albums.length; j++){
                if(document.getElementById(window.albums[j]["id"]).contains(this)){
                  updateTimeOnPlay(window.albums[j]["id"]);
                }
              }
            });

            //turns pause to play button
            pauseMusic(currAlbum["id"]);
          }
        }
      });
    }

    //adds event listener to previous track
    //changes to previous track on click
    var prevTrackButtons = document.getElementsByClassName("previous-track");
    for(var i = 0; i < window.albums.length; i++){
      prevTrackButtons[i].addEventListener("click", function(){
        for(var j = 0; j < window.albums.length; j++){
          if(document.getElementById(window.albums[j]["id"]).contains(this)){
            //updates track number
            var currAlbum = window.albums[j];
            var track = currAlbum["trackNumber"];
            if(track == 0){
              track = currAlbum["trackNames"].length - 1;
            }
            else{
              track--;
            }
            currAlbum["trackNumber"] = track;

            //updates audio
            var audioHTML = "<audio class='audio-player' src='audio/" + currAlbum["id"] + "/" + currAlbum["fileNames"][track] + "'></audio>";
            var audioContainer = document.querySelector("#" + currAlbum["id"] + " .audio-container");
            audioContainer.innerHTML = audioHTML;

            //updates track title
            var trackName = currAlbum["trackNames"][track];
            var trackTitle = document.querySelector("#" + currAlbum["id"] + " .song-title");
            trackTitle.innerText = trackName;

            //updates timestamp
            var audio = document.querySelector("#" + currAlbum["id"] + " audio");
            audio.addEventListener("loadedmetadata", function(){
              for(var j = 0; j < window.albums.length; j++){
                if(document.getElementById(window.albums[j]["id"]).contains(this)){
                  updateTimeOnPlay(window.albums[j]["id"]);
                }
              }
            });

            //turns pause to play button
            pauseMusic(currAlbum["id"]);
          }
        }
      });
    }
  }

  //adds event listener to menu toggler
  //updates menu button icon on click
  var menuButton = document.querySelector(".navbar-toggler");
  menuButton.addEventListener("click", function(){
    this.focus();
    updateMenuIcon();
  });
  menuButton.addEventListener("blur", function(){
    updateMenuIcon();
  });

  //adds event listener to all play buttons
  //if tripped, toggles music to play or pause
  var allPlayButtons = document.getElementsByClassName("play-pause");
  for(var i = 0; i < allPlayButtons.length; i++){
    allPlayButtons[i].addEventListener("click", function(){
      //toggles this play button
      for(var j = 0; j < window.albums.length; j++){
        if(document.getElementById(window.albums[j]["id"]).contains(this)){
          toggleMusic(window.albums[j]["id"]);
        }
      }

      //pauses all other music players
      for(var k = 0; k < window.albums.length; k++){
        if(!document.getElementById(window.albums[k]["id"]).contains(this)){
          pauseMusic(window.albums[k]["id"])
        }
      }
    });
  }

  //adds event listeners to all volume buttons
  //if pressed, toggles volume slider
  //if blurred, closes slider
  //if sliders are changed, updates volume
  var allVolumeButtons = document.getElementsByClassName("volume");
  var allVolumeSliders = document.getElementsByClassName("volume-slider");


  //if device is IOS, deletes all volume controls
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if(isIOS){
    while(allVolumeButtons.length > 0){
      allVolumeButtons[0].remove();
      allVolumeSliders[0].remove();
    }
  }

  for(var i = 0; i < allVolumeButtons.length; i++){
    //toggles volume slider on button press
    allVolumeButtons[i].addEventListener("click", function(){
      for(var j = 0; j < window.albums.length; j++){
        if(document.getElementById(window.albums[j]["id"]).contains(this)){
          this.focus();
          toggleVolume(window.albums[j]["id"]);
        }
      }
    });

    //closes volume slider on blur
    allVolumeButtons[i].addEventListener("blur", function(){
      for(var j = 0; j < window.albums.length; j++){
        if(document.getElementById(window.albums[j]["id"]).contains(this)){
          closeVolume(window.albums[j]["id"]);
        }
      }
    });

    //closes volume slider on blur
    allVolumeSliders[i].addEventListener("blur", function(){
      for(var j = 0; j < window.albums.length; j++){
        if(document.getElementById(window.albums[j]["id"]).contains(this)){
          closeVolume(window.albums[j]["id"]);
        }
      }
    });

    //updates volume on slider input
    allVolumeSliders[i].addEventListener("input", function(){
      for(var j = 0; j < window.albums.length; j++){
        if(document.getElementById(window.albums[j]["id"]).contains(this)){
          this.focus();
          updateVolume(window.albums[j]["id"]);
        }
      }
    });

    //updates volume on slider change
    allVolumeSliders[i].addEventListener("change", function(){
      for(var j = 0; j < window.albums.length; j++){
        if(document.getElementById(window.albums[j]["id"]).contains(this)){
          this.focus();
          updateVolume(window.albums[j]["id"]);
        }
      }
    });
  }

  var musicSliders = document.getElementsByClassName("music-slider");
  var allMusic = document.getElementsByClassName("audio-player");
  for(var i = 0; i < musicSliders.length; i++){
    allMusic[i].addEventListener("playing", function(){
      //increments time each second
      for(var j = 0; j < window.albums.length; j++){
        if(document.getElementById(window.albums[j]["id"]).contains(this)){
          setInterval(updateTimeOnPlay, 100, window.albums[j]["id"]);
        }
      }
    });

    musicSliders[i].addEventListener("input", function(){
      //shows user the time associated with their input position on the slider
      for(var j = 0; j < window.albums.length; j++){
        if(document.getElementById(window.albums[j]["id"]).contains(this)){
          setInterval(updateTimeOnInput, 100, window.albums[j]["id"]);
        }
      }
    });

    musicSliders[i].addEventListener("change", function(){
      //updates audio when time is changed
      for(var j = 0; j < window.albums.length; j++){
        if(document.getElementById(window.albums[j]["id"]).contains(this)){
          updateTimeOnChange(window.albums[j]["id"]);
        }
      }
    });
  }
});

/*
 * if menu is collapsed, sets menu icon to hamburger
 * if menu is open, sets icon to an x
 */
function updateMenuIcon(){

  var updater = function(){
    //if width is >= 768, hamburger icon is invisible
    var width = window.innerWidth;
    if(width >= 768){
      return;
    }

    //gets state of menu, updates image accordingly
    var closed = document.querySelector(".navbar-toggler").getAttribute("aria-expanded");
    var hamburger = "url(images/hamburger-nav.png)";
    var x = "url(images/x.png)";

    //if closed, set to hamburger
    //if open, set to x
    if(closed === "false"){
      document.querySelector(".navbar-toggler-icon").style.backgroundImage = hamburger;
    }
    else{
      document.querySelector(".navbar-toggler-icon").style.backgroundImage = x;
    }
  }

  setTimeout(updater, 10);
}

/*
 * updates all time info for a track based on time of audio
 */
function updateTimeOnPlay(playerId){
  //if music slider is clicked, do not update
  if($("#" + playerId + " .music-slider:active").length != 0){
    return;
  }

  var player = document.getElementById(playerId);
  var music = player.querySelector("audio");

  var time = Math.round(music.currentTime);
  var duration = Math.round(music.duration);

  //calculates progress
  var portionComplete = (time / duration) * 1000;

  //updates music slider value
  var slider = player.querySelector(".music-slider");
  slider.value = portionComplete;

  //calculates timestamp and inserts into html
  var timeMins = Math.trunc(time / 60);
  var durationMins = Math.trunc(duration / 60);

  var timeSecs = time % 60;
  var durationSecs = duration % 60;

  if(timeSecs <= 9){
    timeSecs = "0" + timeSecs;
  }
  if(durationSecs <= 9){
    durationSecs = "0" + durationSecs;
  }

  var timestamp = timeMins + ":" + timeSecs + "/" + durationMins + ":" + durationSecs;
  player.querySelector(".music-container span").innerText = timestamp;
}

/*
 * on change to music slider, changes time of audio
 */
function updateTimeOnChange(playerId){
  var player = document.getElementById(playerId);
  var music = player.querySelector("audio");
  var slider = player.querySelector(".music-slider");

  var value = slider.value;
  var newTime = (value / 1000) * music.duration;
  music.currentTime = newTime;
}

/*
 * on input to music slider, update timestamp
 */
function updateTimeOnInput(playerId){
   var player = document.getElementById(playerId);
   var music = player.querySelector("audio");
   var slider = player.querySelector(".music-slider");

   var value = slider.value;
   var time = Math.round((value / 1000) * music.duration);
   var duration = Math.round(music.duration);

   //calculates timestamp and inserts into html
   var timeMins = Math.trunc(time / 60);
   var durationMins = Math.trunc(duration / 60);

   var timeSecs = time % 60;
   var durationSecs = duration % 60;

   if(timeSecs <= 9){
     timeSecs = "0" + timeSecs;
   }
   if(durationSecs <= 9){
     durationSecs = "0" + durationSecs;
   }

   var timestamp = timeMins + ":" + timeSecs + "/" + durationMins + ":" + durationSecs;
   player.querySelector(".music-container span").innerText = timestamp;
}

/*
 * pauses audio
 * sets icon to play button
 */
function pauseMusic(playerId){
  var player = document.querySelector("#" + playerId);
  var music = player.querySelector("audio");
  var icon = player.querySelector(".play-pause").querySelector("i");

  if(icon.classList.contains("fa-pause")){
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");
    icon.style.marginLeft = "1.3rem";
    music.pause();
  }
}

/*
 * toggles pause and play button
 */
function toggleMusic(playerId){
  //toggles play and pause icon
  //plays and pauses music
  var player = document.querySelector("#" + playerId);
  var music = player.querySelector("audio");
  var icon = player.querySelector(".play-pause").querySelector("i");

  if(icon.classList.contains("fa-play")){
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    icon.style.marginLeft = "1.2rem";
    music.play();
  }
  else{
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");
    icon.style.marginLeft = "1.3rem";
    music.pause();
  }
}

/*
 * on click of button, toggles volumes
 */
function toggleVolume(playerId){
  //toggles volume slider when clicked
  var player = document.querySelector("#" + playerId);
  var slider = player.querySelector(".volume-slider");

  if(slider.classList.contains("invisible")){
    slider.classList.remove("invisible");
    slider.classList.add("visible");
  }
  else{
    slider.classList.add("invisible");
    slider.classList.remove("visible");
  }
}

/*
 * on blur, closes volume
 */
function closeVolume(playerId){
  //if user is hovering on volume, does nothing
  if($(".volume-slider:hover").length != 0){
    return;
  }

  var player = document.querySelector("#" + playerId);
  var slider = player.querySelector(".volume-slider");

  if(slider.classList.contains("visible")){
    slider.classList.add("invisible");
    slider.classList.remove("visible");
  }
}

/*
 * updates volume of audio player
 */
function updateVolume(playerId){
  var player = document.querySelector("#" + playerId);
  var music = player.querySelector("audio");
  var slider = player.querySelector(".volume-slider");
  var newVolume = slider.value;

  //updates volume to new input
  music.volume = (newVolume / 100);
}
