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
    document.write('<h1>You are currently on: </h1>');
    document.write(currUrl);
});