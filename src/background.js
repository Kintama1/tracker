let activeTabId = null;
let siteTimeData = {};
let currentFavIcon = null;

let currentDomain = null;
let isTracking = false;
let display = "daughnut";

let lastUpdateTime = null;
let updateInterval = null;

//function that gets the domain name from the url
function getDomain(url) {
    try {
        if (!url) return null;
        const hostname = new URL(url).hostname;
        return hostname || null;
    } catch {
        return null;
    }
}

//function that increments the time spent on a website, much better for use when the popup is open as it is relatively more accurate
function incrementTime(domain) {
    if (!domain) return;
    
    siteTimeData[domain][1] = (siteTimeData[domain][1] || 0) + 1;
    console.log(`Time incremented for ${domain}:`, siteTimeData[domain][1]);
    
    // Save to storage and notify popup if open
    chrome.storage.local.set({ siteTimeData }, () => {
        if (display === "list") {
        chrome.runtime.sendMessage({
            type: 'timeUpdateList',
            timeData: siteTimeData
        
        }).catch(() => {
            // Ignore error if popup is closed
        });
        }
        if (display === "daughnut") {
            chrome.runtime.sendMessage({
                type: 'timeUpdateDaughnut',
                timeData: siteTimeData
            }).catch(() => {
                // Ignore error if popup is closed
            });
        }
    });
}

//function that increments time as long as the popup is open and the tab is active
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

//handling favicons

//checking if the backup favicon is valid
function fetchFavicon(url, callback) {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                callback(url); // Favicon is valid
            } else {
                callback(null); // Fallback failed
            }
        })
        .catch(() => callback(null)); // Network error
}

//function that updates the timeSite data and adds the favicon for that website to it
function updateSiteTimeData(domain, favicon) {
    if (!siteTimeData[domain]) {
        siteTimeData[domain] = [favicon, 0]; // Add domain with favicon and initial time
    } else {
        siteTimeData[domain][0] = favicon; // Update favicon for existing domain
    }
}

function favRoutine(currentDomain, currentFavIcon) {
    if (!currentDomain) {
        console.error('Domain is null, skipping favicon handling.');
        return;
    }
    // Fallback for websites without a favicon
    if (!currentFavIcon) {
        const fallbackFaviconUrl = `https://${currentDomain}/favicon.ico`;
        fetchFavicon(fallbackFaviconUrl, (validFaviconUrl) => {
            currentFavIcon = validFaviconUrl || 'assets/default-favicon.png';
            updateSiteTimeData(currentDomain, currentFavIcon);
        });
    } else {
        updateSiteTimeData(currentDomain, currentFavIcon);
    }
}


// Message handling
///


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
                    currentFavIcon = tabs[0].favIconUrl;
                    if (tabs[0].url.startsWith('chrome://')) {
                        currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
                    }
                    
                    favRoutine(currentDomain, currentFavIcon);
                    
                    startTracking();
                    console.log('Started tracking for:', currentDomain);
                }
            });
        } else {
            stopTracking();
            activeTabId = null;
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
    if (message.type === 'daughnut') {
        display = "daughnut";
        console.log('Displaying: ', display);
        sendResponse({ status: 'success' });
        return true;
    }
    if (message.type === 'list') {  
        display = "list";
        console.log('Displaying: ', display);
        sendResponse({ status: 'success' });
        return true;
    }
});





// Tab focus handling

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
                currentFavIcon = tabs[0].favIconUrl;
                if (tabs[0].url.startsWith('chrome://')) {
                    currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
                }
                
                favRoutine(currentDomain, currentFavIcon);
                
                startTracking();
                console.log('Resumed tracking for:', currentDomain);
            }
        });
    }
});

// listens to when a tab becomes the active tab i the browser
chrome.tabs.onActivated.addListener((activeInfo) => {
    if (!isTracking) return;
    stopTracking();
    
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        activeTabId = tab.id;
        currentDomain = getDomain(tab.url);
        currentFavIcon = tab.favIconUrl;
        console.log('Current domain:', tab.url);
        if (tab.url.startsWith('chrome://')) {
            currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
        }
       
        favRoutine(currentDomain, currentFavIcon);
        
        startTracking();
        console.log('Tab activated:', currentDomain);
    });
});
//This listens to change within the tab itself, although entirely unsure whether it is necessary, it works for now so I would keep it
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!isTracking) return;
    if (tabId === activeTabId && changeInfo.url) {
        stopTracking();
        currentDomain = getDomain(changeInfo.url);
        currentFavIcon = tab.favIconUrl;
        if (tab.url.startsWith('chrome://')) {
            currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
        }
        favRoutine(currentDomain, currentFavIcon);
        
        startTracking();
        console.log('Tab URL updated:', currentDomain);
    }
});




// Initialize from storage starts working when the extension is opened
chrome.storage.local.get(['isTracking', 'siteTimeData'], (result) => {
    isTracking = result.isTracking || false;
    siteTimeData = result.siteTimeData || {};
    
    if (isTracking) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                activeTabId = tabs[0].id;
                currentDomain = getDomain(tabs[0].url);
                currentFavIcon = tabs[0].favIconUrl;
                if (tabs[0].url.startsWith('chrome://')) {
                    currentFavIcon = 'assets/chrome-favicon.png'; // Assign a specific icon for Chrome internal pages
                }
                
                favRoutine(currentDomain, currentFavIcon);
                
                startTracking();
            }
        });
    }
}); 