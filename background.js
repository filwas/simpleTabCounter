function tabUpdate() {
    chrome.tabs.query({currentWindow: true}).then(
        (fulfill) => chrome.action.setBadgeText({text: fulfill.length.toString()})
    )
}

tabUpdate();
chrome.tabs.onCreated.addListener(() => tabUpdate());
chrome.tabs.onRemoved.addListener(() => tabUpdate());
chrome.tabs.onActivated.addListener(() => tabUpdate());
chrome.windows.onCreated.addListener(() => tabUpdate());
chrome.windows.onRemoved.addListener(() => tabUpdate());
chrome.windows.onFocusChanged.addListener(() => tabUpdate());
