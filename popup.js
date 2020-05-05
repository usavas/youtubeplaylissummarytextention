'use strict';

// document.addEventListener('DOMContentLoaded', function(){
//     //TODO get all the videos in the list when the document load completes

//     //TODO calculate and print to a new browser tab
// });


let loadContent = document.getElementById('loadContent');

loadContent.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, {
            file: 'alert.js'
        });
    });
};

