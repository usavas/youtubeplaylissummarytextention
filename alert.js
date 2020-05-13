var title = document.querySelector(
  "div#container div#header-contents div#header-description h3"
).innerText;

var videos = document.querySelectorAll(
  "div#secondary div#container div#items.playlist-items #playlist-items"
);

var summaryList = [];
summaryList.push({ title: "Title: ", time: title });
var totalVideoTimeInSec = 0;

videos.forEach((element) => {
  var videoTime = element.querySelector(
    "#container #thumbnail-container ytd-thumbnail-overlay-time-status-renderer span"
  ).innerText;

  var videoTitle = element.querySelector(
    "div#container div#meta h4 span#video-title"
  ).innerText;

  summaryList.push({ title: videoTitle, time: videoTime });

  var times = videoTime.split(":");

  totalVideoTimeInSec += parseInt(times[times.length - 1]);
  totalVideoTimeInSec += parseInt(times[times.length - 2]) * 60;
  if (times.length > 2) {
    totalVideoTimeInSec += parseInt(times[0]) * 60 * 60;
  }
});

function getTotalTimeInString(totalTimeInSeconds, playSpeed) {
  let totalTime = totalTimeInSeconds / playSpeed;
  totalTime = Math.floor(totalTime);
  var hours, minutes, seconds;
  hours = Math.floor(totalTime / 3600);
  totalTime %= 3600;
  minutes = Math.floor(totalTime / 60);
  seconds = totalTime % 60;
  let totalTimeInString = hours + ":" + minutes + ":" + seconds;
  return totalTimeInString;
}

summaryList.splice(5, 0, {
  title: " Total Time: ",
  time: getTotalTimeInString(totalVideoTimeInSec, 1),
});

summaryList.splice(4, 0, {
  title: "Total time in 1.25 speed: ",
  time: getTotalTimeInString(totalVideoTimeInSec, 1.25),
});
summaryList.splice(3, 0, {
  title: "Total time in 1.5 speed ",
  time: getTotalTimeInString(totalVideoTimeInSec, 1.5),
});
summaryList.splice(2, 0, {
  title: "Total time in 1.75 speed: ",
  time: getTotalTimeInString(totalVideoTimeInSec, 1.75),
});
summaryList.splice(1, 0, {
  title: "Total time in 2 speed: ",
  time: getTotalTimeInString(totalVideoTimeInSec, 2),
});

var sumWindow = window.open("", "sumWindow", "width= 600,height:400");

var tableDom = sumWindow.document.createElement("table");
tableDom.cellSpacing = '10px';
tableDom.style.fontSize = '20px';

var tHead = tableDom.createTHead();
var tHeaderRow = tHead.insertRow();

var colTitle = sumWindow.document.createTextNode('Title');
var hCell1 = tHeaderRow.insertCell(0);
hCell1.appendChild(colTitle);
tHeaderRow.appendChild(hCell1);

var colValue = sumWindow.document.createTextNode('Value');
var hCell2 = tHeaderRow.insertCell(1);
hCell2.appendChild(colValue);
tHeaderRow.appendChild(hCell2);

tHead.appendChild(tHeaderRow);
tableDom.appendChild(tHead);

function addRowToTable(title, time2) {
  let tRow = tBody.insertRow();

  let cell1 = tRow.insertCell(0);
  let cellText1 = sumWindow.document.createTextNode(title);
  cell1.appendChild(cellText1);

  let cell2 = tRow.insertCell(1);
  let cellText2 = sumWindow.document.createTextNode(time2);
  cell2.appendChild(cellText2);

  tRow.appendChild(cell1);
  tRow.appendChild(cell2);
  tBody.appendChild(tRow);
}

function addScrollMargin() {
  var scrollMargin = sumWindow.document.createElement("div");
  scrollMargin.style.height = "500px";
  sumWindow.document.body.appendChild(scrollMargin);
}

var tBody = tableDom.createTBody();

summaryList.forEach((element) => {
  addRowToTable(element.title, element.time);
});
tableDom.appendChild(tBody);

sumWindow.document.body.appendChild(tableDom);
addScrollMargin();

console.log(tableDom);
