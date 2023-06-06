//this function updates action button badge text
function tabUpdate() {
    chrome.tabs.query({currentWindow: true}).then(
        (fulfill) => chrome.action.setBadgeText({text: fulfill.length.toString()})
    )
}

//this function searches for buttons to click
function buttonClicker(){
    
    //only search within tabs that are in the current window, and are from Airhelp URL
    let queryOptions = {
        currentWindow: true,
        url: "https://cockpit.airhelp.com/*"
    }

    //this async function's result is an array of all the tabs that pass the parameters above
    //please note that it's not literally an "array of tabs", it's actually an array of tabs.Tab objects that contain some of the info from tabs, but do not contain DOM etc.
    chrome.tabs.query(queryOptions).then(
        (fulfill) => {
            fulfill.forEach(tab => {
                let id = tab.id;
                //we're getting the tab's IDs from the array above, and we're injecting a script into each such tab
                chrome.scripting.executeScript({
                    target: {tabId: id},
                    func: () => {

                        let bigGreen = document.getElementsByClassName("btn btn-lg btn-success")[0];
                        let submitToPayout = document.getElementsByClassName("submit-to-payout-test")[0];
                        let sendButton = document.getElementsByClassName("btn btn-primary btn-lg")[0];

                        //the buttons that i want to get clicked
                        //document.getElementById("start-claim-assessment-btn-xx-check").click(); //start claim assessment
                        //document.getElementsByClassName("btn btn-lg btn-success")[0].click(); // big green button
                        //document.getElementsByClassName("submit-to-payout-test")[0].click(); // submit to payout
                        //document.getElementsByClassName("btn btn-primary btn-lg")[0].click(); // send

                        if (bigGreen) {bigGreen.click(); return}
                        else if (sendButton) {sendButton.click(); return} 
                        else if (submitToPayout) {submitToPayout.click(); return}
                    }
                });
            });
        }
    );
}



//this is just a bunch of listeners, that make the extension update the action button badge at basically every opportunity
tabUpdate();
chrome.action.onClicked.addListener(() => buttonClicker());  
chrome.tabs.onCreated.addListener(() => tabUpdate());
chrome.tabs.onRemoved.addListener(() => tabUpdate());
chrome.tabs.onActivated.addListener(() => tabUpdate());
chrome.tabs.onAttached.addListener(() => tabUpdate());
chrome.tabs.onDetached.addListener(() => tabUpdate());
chrome.tabs.onHighlighted.addListener(() => tabUpdate());
chrome.tabs.onMoved.addListener(() => tabUpdate());
chrome.windows.onCreated.addListener(() => tabUpdate());
chrome.windows.onRemoved.addListener(() => tabUpdate());
chrome.windows.onFocusChanged.addListener(() => tabUpdate());


chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status == "complete") {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['contentScript.js']
        });
    }
  });
  