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
var query = firebase.database().ref().orderByKey();
let websiteFound = false;
let websiteInfo = null;

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let currTitle = tabs[0].title;
    //let currUrl = tabs[0].url;
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if(currTitle.toLowerCase().includes(childSnapshot.key.toLowerCase())) {
                console.log("website found");
                websiteInfo = childSnapshot;
                websiteFound = true;
            }
        });
        setScoreImages(websiteFound, websiteInfo, currTitle);
    });
});

function setScoreImages(websiteFound, websiteInfo, currTitle) {
    let carbonScore = null;
    let tradeScore = null;
    let wasteScore = null;
    let averageScore = null;
    if(websiteFound) {
        currTitle = websiteInfo.key;
        carbonScore = websiteInfo.child("Carbon/Score").val();
        tradeScore = websiteInfo.child("Trade/Score").val();
        wasteScore = websiteInfo.child("Waste/Score").val();

        averageScore = (carbonScore + tradeScore + wasteScore) / 3;
        averageScore = Math.round(averageScore);
    } else {
        carbonScore = -1;
        tradeScore = -1;
        wasteScore = -1;
    }
    let carbonImg = setImage(carbonScore);
    let tradeImg = setImage(tradeScore);
    let wasteImg = setImage(wasteScore);
    let bigRating = null;
    if(averageScore > 0) {
        bigRating = setImage(averageScore);
    } else {
        bigRating = "../images/bigscore-na.png";
    }

    document.getElementById('webURL').innerHTML = currTitle;
    document.getElementById('bigRating').src = bigRating;
    document.getElementById('carbonImg').src = carbonImg;
    document.getElementById('wasteImg').src = wasteImg;
    document.getElementById('tradeImg').src = tradeImg;
}

function setImage(ratingNum) {
    let ratingImg = "";
    switch(ratingNum) {
        case 1:
            ratingImg = "../images/score-1.png";
            break;
        case 2:
            ratingImg = "../images/score-2.png";
            break;
        case 3:
            ratingImg = "../images/score-3.png";
            break;
        case 4:
            ratingImg = "../images/score-4.png";
            break;
        case 5:
            ratingImg = "../images/score-5.png";
            break;
        case 6:
            ratingImg = "../images/score-6.png";
            break;
        case 7:
            ratingImg = "../images/score-7.png";
            break;
        case 8:
            ratingImg = "../images/score-8.png";
            break;
        case 9:
            ratingImg = "../images/score-9.png";
            break;
        case 10:
            ratingImg = "../images/score-10.png";
            break;
        default:
            ratingImg = "../images/score-na.png";
            break;
    }
    return ratingImg;
}

var button1Click = document.getElementById("button1");
var button2Click = document.getElementById("button2");
button1Click.onclick = openReco;
button2Click.onclick = openRating;

function openReco(event) {
    window.open("https://adodd301.wixsite.com/website/about-3-1-1");
}

function openRating(event) {
    window.open("https://adodd301.wixsite.com/website/news-2-1");
}