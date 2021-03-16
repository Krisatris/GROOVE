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

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let currTitle = tabs[0].title;
    //let currUrl = tabs[0].url;
    let carbonScore = null;
    let tradeScore = null;
    let wasteScore = null;
    let averageScore = null;
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if(currTitle.toLowerCase().includes(childSnapshot.key.toLowerCase())) {
                currTitle = childSnapshot.key;

                carbonScore = childSnapshot.child("Carbon/Score").val();
                tradeScore = childSnapshot.child("Trade/Score").val();
                wasteScore = childSnapshot.child("Waste/Score").val();

                averageScore = (carbonScore + tradeScore + wasteScore) / 3;
                averageScore = Math.round(averageScore);
            }
            var bigRating = setImage(averageScore);
            var carbonImg = setImage(carbonScore);
            var tradeImg = setImage(tradeScore);
            var wasteImg = setImage(wasteScore);

            document.getElementById('webURL').innerHTML = currTitle;
            document.getElementById('bigRating').src = bigRating;
            document.getElementById('carbonImg').src = carbonImg;
            document.getElementById('wasteImg').src = wasteImg;
            document.getElementById('tradeImg').src = tradeImg;
        });
    });
    /*
    if(currUrl.includes("amazon")) {
        currUrl = "Amazon";
        bigRating = "images/score-2.png";
        carbonImg = "images/score-4.png";
        wasteImg = "images/score-1.png";
        tradeImg = "images/score-2.png";
    }
    else if(currUrl.includes("losangeles")) {
        currUrl = "Los Angeles Apparel";
        bigRating = "images/score-10.png";
        carbonImg = "images/score-10.png";
        wasteImg = "images/score-10.png";
        tradeImg = "images/score-10.png";
    }
    */
    //document.getElementById('webTitle').innerHTML = currTitle;
});

var recoClick = document.getElementById("recommendations");
recoClick.onclick = changePage;

function changePage(event) {
    document.getElementById("websiteBar").style.display = "none";
    document.getElementById("bigRating").style.display = "none";
    document.getElementById("smallBox").style.display = "none";
    document.getElementById("recommendations").style.display = "none";
    document.getElementById("otherOptions").style.display = "block";
}

var LAClick = document.getElementById("otherOptions");
LAClick.onclick = openPage;

function openPage(event) {
    window.open("https://losangelesapparel.net/collections/women-sweatshirts-heavy-fleece/products/hf09gd-unisex-garment-dye-14oz-heavy-fleece-hooded-pullover-sweatshirt?variant=8694280650858");
}

function setImage(ratingNum) {
    let ratingImg = "";
    switch(ratingNum) {
        case 1:
            ratingImg = "images/score-1.png";
            break;
        case 2:
            ratingImg = "images/score-2.png";
            break;
        case 3:
            ratingImg = "images/score-3.png";
            break;
        case 4:
            ratingImg = "images/score-4.png";
            break;
        case 5:
            ratingImg = "images/score-5.png";
            break;
        case 6:
            ratingImg = "images/score-6.png";
            break;
        case 7:
            ratingImg = "images/score-7.png";
            break;
        case 8:
            ratingImg = "images/score-8.png";
            break;
        case 9:
            ratingImg = "images/score-9.png";
            break;
        case 10:
            ratingImg = "images/score-10.png";
            break;
        default:
            break;
    }
    return ratingImg;
}