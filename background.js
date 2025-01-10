let activeTabId = null;
let startTime = null;
let siteTimeData = {};

let currentDomain = null;
let isTracking = false;

let lastUpdateTime = null;
let updateInterval = null;

function getDomain(url) {
    try {
        if (!url) return null;
        const hostname = new URL(url).hostname;
        return hostname || null;
    } catch {
        return null;
    }
}

function incrementTime(domain) {
    if (!domain) return;
    
    siteTimeData[domain] = (siteTimeData[domain] || 0) + 1;
    console.log(`Time incremented for ${domain}:`, siteTimeData[domain]);
    
    // Save to storage and notify popup if open
    chrome.storage.local.set({ siteTimeData }, () => {
        chrome.runtime.sendMessage({
            type: 'timeUpdate',
            timeData: siteTimeData
        }).catch(() => {
            // Ignore error if popup is closed
        });
    });
}

function startTracking() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
    
    updateInterval = setInterval(() => {
        if (isTracking && currentDomain) {
            incrementTime(currentDomain);
        }
    }, 1000);
}

function stopTracking() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

// Message handling
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getData') {
        sendResponse({ timeData: siteTimeData });
        return true;
    }
    
    if (message.type === 'startOrPause') {
        isTracking = message.status;
        console.log('Tracking status changed to:', isTracking);
        
        if (isTracking) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    activeTabId = tabs[0].id;
                    currentDomain = getDomain(tabs[0].url);
                    startTime = Date.now();
                    startTracking();
                    console.log('Started tracking for:', currentDomain);
                }
            });
        } else {
            stopTracking();
            activeTabId = null;
            startTime = null;
            currentDomain = null;
        }
        
        chrome.storage.local.set({ isTracking });
        sendResponse({ status: 'success' });
        return true;
    }
    
    if (message.type === 'clear') {
        siteTimeData = {};
        chrome.storage.local.set({ siteTimeData });
        console.log('Cleared time data');
        sendResponse({ status: 'success' });
        return true;
    }
});

// Window focus handling
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (!isTracking) return;
    
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        console.log('Window lost focus');
        stopTracking();
    } else {
        console.log('Window gained focus');
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                activeTabId = tabs[0].id;
                currentDomain = getDomain(tabs[0].url);
                startTime = Date.now();
                startTracking();
                console.log('Resumed tracking for:', currentDomain);
            }
        });
    }
});

// Tab event listeners
chrome.tabs.onActivated.addListener((activeInfo) => {
    if (!isTracking) return;
    stopTracking();
    
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        activeTabId = tab.id;
        currentDomain = getDomain(tab.url);
        startTime = Date.now();
        startTracking();
        console.log('Tab activated:', currentDomain);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!isTracking) return;
    if (tabId === activeTabId && changeInfo.url) {
        stopTracking();
        currentDomain = getDomain(changeInfo.url);
        startTime = Date.now();
        startTracking();
        console.log('Tab URL updated:', currentDomain);
    }
});

// Initialize from storage
chrome.storage.local.get(['isTracking', 'siteTimeData'], (result) => {
    isTracking = result.isTracking || false;
    siteTimeData = result.siteTimeData || {};
    
    if (isTracking) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                activeTabId = tabs[0].id;
                currentDomain = getDomain(tabs[0].url);
                startTime = Date.now();
                startTracking();
            }
        });
    }
});