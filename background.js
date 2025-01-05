
let activeTabId = null; //ID of the currently active tab
let startTime = null; // When the tab became active

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type ==="GET_CURRENT_TAB"){ ///lisening for message type from popup.js
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length > 0){
            sendResponse({tab: tabs[0]}); //so this is saying if the length of current tab > 0, send it
        } else {
            sendResponse({tab: null});
        }
    });
    return true;
}
});

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
    const now = Date.now();
    if (activeTabId && startTime){
        const duration = now - startTime;
        console.log(`Tab ${activeTabId} was active for ${duration} milliseconds`);
    }
    activeTabId = activeInfo.tabId;
    startTime = now;
    console.log(`Tab ${activeTabId} is now active`);
});

// Listen for when tab changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.url){
        console.log(`Tab URL updated to: ${changeInfo.url}`);
    }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    const now = Date.now();
if (windowId === chrome.windows.WINDOW_ID_NONE) {
    if (activeTabId && startTime) {
        const duration = now - startTime;
        console.log(`Tab ${activeTabId} was active for ${duration} milliseconds`);
    }
    activeTabId = null;
    startTime = null;
} else {
    console.log("returned to chrome");
}
});