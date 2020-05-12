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

function getTotalTimeInString(totalTimeInSeconds, playSpeed){
  let totalTime = totalTimeInSeconds / playSpeed;
  totalTime = Math.floor(totalTime);
  var hours, minutes, seconds;
  hours = Math.floor(totalTime / 3600);
  totalTime %= 3600;
  minutes = Math.floor(totalTime / 60);
  seconds = totalTime % 60;
  let totalTimeInString = hours + ':' + minutes + ':' + seconds;
  return totalTimeInString;
}

console.log(summaryList.join('\n'));

summaryList[0] += (' Total Time: ' + getTotalTimeInString(totalVideoTimeInSec, 1));

summaryList[1] = 'Total time in 1.25 speed: ' + getTotalTimeInString(totalVideoTimeInSec, 1.25);
summaryList[2] = 'Total time in 1.5 speed ' + getTotalTimeInString(totalVideoTimeInSec, 1.5);
summaryList[3] = 'Total time in 1.75 speed: ' + getTotalTimeInString(totalVideoTimeInSec, 1.75);
summaryList[4] = 'Total time in 2 speed: ' + getTotalTimeInString(totalVideoTimeInSec, 2);


var sumWindow = window.open("", "sumWindow", "width= 600,height:400");
sumWindow.document.write(summaryList.join('<br>'));

