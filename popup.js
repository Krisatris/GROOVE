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
    var query = firebase.database().ref().orderByKey();
    let currTitle = tabs[0].title;
    let currUrl = tabs[0].url;
    let carbonScore = null;
    let tradeScore = null;
    let wasteScore = null;
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.key);
            if(currTitle.toLowerCase().includes(childSnapshot.key.toLowerCase())) {
                currTitle = childSnapshot.key;
                carbonScore = childSnapshot.child("Carbon/Score").val();
                tradeScore = childSnapshot.child("Trade/Score").val();
                wasteScore = childSnapshot.child("Waste/Score").val();
            }
        });
    });
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
    }
    else if(currUrl.includes("losangeles")) {
        currUrl = "Los Angeles Apparel";
        bigRating = "images/score-10.png";
        carbonImg = "images/score-10.png";
        wasteImg = "images/score-10.png";
        tradeImg = "images/score-10.png";
    }
    //document.getElementById('webTitle').innerHTML = currTitle;
    document.getElementById('webURL').innerHTML = currTitle;
    document.getElementById('bigRating').src = bigRating;
    document.getElementById('carbonImg').src = carbonImg;
    document.getElementById('wasteImg').src = wasteImg;
    document.getElementById('tradeImg').src = tradeImg;
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