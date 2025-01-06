
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

// Function to update the siteTimeData object by adding the time spent on the site and updating the local storage
function updateSiteTimeData(url, timespent) {
    const domain = getDomain(url);
    if (!domain) {
        return;
    }
    siteTimeData[domain] = (siteTimeData[domain] || 0) + timespent; // If the domain is not in the object, set it to 0
    chrome.storage.local.set({siteTimeData});
    
}

function handleTabChange(newTabId, newUrl) {
    const now = Date.now();
    if (activeTabId !== null && startTime !== null) {
        const timespent = Math.floor((now - startTime)/1000);
        updateSiteTimeData(newUrl, timespent);
    }
    // Update the active tab and start time
    activeTabId = newTabId;
    startTime = now;
}


// Listen for tab and take in effect the required changes
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        handleTabChange(tab.id, tab.url);
    });
});

// Listen for when tab changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.url){
        handleTabChange(tabId, changeInfo.url);
    }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    const now = Date.now();
if (windowId === chrome.windows.WINDOW_ID_NONE) {
    if (activeTabId && startTime) {
        handleTabChange(null, null);
    }
}
});