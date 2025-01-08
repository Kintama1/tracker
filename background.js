
let activeTabId = null; //ID of the currently active tab
let startTime = null; // When the tab became active
let siteTimeData = {}; // Time spent on each site

// function to get the domain of an URL
function getDomain(url) {
    try {
        return new URL(url).hostname; // Extract hostname from URL by creating a new URL object
    }
    catch{
        return null;
    }
}

function handleTabChange(newTabId, newUrl) {
    const domain = getDomain(newUrl);
    if (activeTabId !== null && startTime !== null && domain) {
        const now = Date.now();
        const timespent = Math.floor((now - startTime)/1000);
        siteTimeData[domain] = (siteTimeData[domain] || 0) + timespent;
        chrome.storage.local.set({siteTimeData});
        
    }
    // Update the active tab and start time
    activeTabId = newTabId;
    startTime = now;
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('message received', message);
    if (message.type === 'getData') {
    console.log('popup opening 1x');
    //popup is opening, time to calulate 
    // and hand off data
    if (activeTabId !== null && startTime !== null) {
        console.log('popup opening');
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]){
                const domain = getDomain(tabs[0].url);
                if (domain) {
                    const now = Date.now();
                    const timespent = Math.floor((now - startTime)/1000);
                    siteTimeData[domain] = (siteTimeData[domain] || 0) + timespent;
                }
            }
        });
    }
    //reset the active tab and start time
    activeTabId = null;
    startTime = null;
    sendResponse({timeData: siteTimeData});
    }
    if (message.type === 'clear') {
        siteTimeData = {};
        activeTabId = null;
        startTime = null;
        sendResponse({status: 'success'});
    }
    if (message.type === 'popupClosing') {
        console.log('popup closing');
        siteTimeData = message.data;
        chrome.storage.local.set({siteTimeData});
        console.log('popup closing', message.data);
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]){
                activeTabId = tabs[0].id;
                startTime = Date.now();
            }
        });
        
    }
    return true;
}); 



// Listens updates in what tab is the currently active tab
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        handleTabChange(tab.id, tab.url);
    });
    console.log(activeInfo, "tab activated event registered");
});

// Listen for when tab changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.url){
        handleTabChange(tabId, changeInfo.url);
    }
    console.log(tabId, changeInfo, tab, "tab updated event registered");
});

chrome.windows.onFocusChanged.addListener((windowId) => {
if (windowId === chrome.windows.WINDOW_ID_NONE) {
    if (activeTabId && startTime) {
        handleTabChange(null, null);
    }
}
});

