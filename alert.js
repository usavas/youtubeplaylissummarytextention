var title = document.querySelector(
  "div#container div#header-contents div#header-description h3"
).innerText;
console.log(title);


var videos = document.querySelectorAll(
  "div#secondary div#container div#items.playlist-items #playlist-items"
);


var summaryList = [];
summaryList.push('Title: ' + title);
var totalVideoTimeInSec = 0;

videos.forEach((element) => {
    
  var videoTime = element.querySelector(
    "#container #thumbnail-container ytd-thumbnail-overlay-time-status-renderer span"
  ).innerText;

  var videoTitle = element.querySelector(
    "div#container div#meta h4 span#video-title"
  ).innerText;

  summaryList.push("\n" + videoTitle + ' - ' + videoTime);


  var times = videoTime.split(':');

  totalVideoTimeInSec += parseInt(times[times.length - 1]);
  totalVideoTimeInSec += parseInt(times[times.length - 2]) * 60;
  if(times.length > 2){
    totalVideoTimeInSec += parseInt(times[0]) * 60 * 60;
  }
});

console.log(summaryList.join('\n'));

var hours, minutes, seconds; 
hours = Math.floor(totalVideoTimeInSec / 3600);
totalVideoTimeInSec %= 3600;
minutes = Math.floor(totalVideoTimeInSec / 60);
seconds = totalVideoTimeInSec % 60;

var totalTimeInString = hours + ':' + minutes + ':' + seconds;
summaryList[0] += (' Total Time: ' + totalTimeInString);

var sumWindow = window.open("", "sumWindow", "width= 600,height:400");
sumWindow.document.write(summaryList.join('<br>'));

