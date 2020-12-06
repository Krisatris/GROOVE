/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) { 
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
};
*/
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let currUrl = tabs[0].url;
    let currTitle = tabs[0].title;
    var bigRating = "images/score-10.png";
    var carbonImg = "images/score-10.png";
    var wasteImg = "images/score-10.png";
    var tradeImg = "images/score-10.png";
    if(currUrl.includes("amazon")) {
        currUrl = "Amazon";
        bigRating = "images/score-2.png";
        carbonImg = "images/score-4.png";
        wasteImg = "images/score-1.png";
        tradeImg = "images/score-2.png";
        console.log(bigRating);
    }
    else if(currUrl.includes("losangeles")) {
        currUrl = "Los Angeles Apparel";
        bigRating = "images/score-10.png";
        carbonImg = "images/score-10.png";
        wasteImg = "images/score-10.png";
        tradeImg = "images/score-10.png";
    }
    //document.getElementById('webTitle').innerHTML = currTitle;
    console.log(bigRating);
    document.getElementById('webURL').innerHTML = currUrl;
    document.getElementById('bigRating').src = bigRating;
    document.getElementById('carbonImg').src = carbonImg;
    document.getElementById('wasteImg').src = wasteImg;
    document.getElementById('tradeImg').src = tradeImg;
});