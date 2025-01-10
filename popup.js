document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('time-tracker');
    const startButton = document.getElementById('start');
    const clearButton = document.getElementById('clear');
    let timeData = {};

    function formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds}s`;
        }
        if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}m ${remainingSeconds}s`;
        }
        const hours = Math.floor(seconds / 3600);
        const remainingMinutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${remainingMinutes}m`;
    }

    function displayData() {
        container.innerHTML = '';
        const sortedDomains = Object.entries(timeData).sort(([, a], [, b]) => b - a);
        
        if (sortedDomains.length === 0) {
            container.innerHTML = '<div class="no-data">No tracking data available</div>';
            return;
        }

        sortedDomains.forEach(([domain, time]) => {
            const domainDiv = document.createElement('div');
            domainDiv.className = `domain-entry`;
            domainDiv.innerHTML = `
                <span class="domain-name">${domain}</span>
                <span class="domain-time">${formatTime(time)}</span>
            `;
            container.appendChild(domainDiv);
        });
    }

    function updateButtonStyle(isTracking) {
        startButton.textContent = isTracking ? 'Pause' : 'Start';
        if (isTracking) {
            startButton.classList.add('active');
        } else {
            startButton.classList.remove('active');
        }
    }

    // Listen for time updates from background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'timeUpdate') {
            timeData = message.timeData;
            displayData();
        }
    });

    // Get initial data
    chrome.runtime.sendMessage({ type: 'getData' }, (response) => {
        if (response && response.timeData) {
            timeData = response.timeData;
            displayData();
        }
    });

    // Initialize button state
    chrome.storage.local.get(['isTracking'], (result) => {
        const isTracking = result.isTracking || false;
        updateButtonStyle(isTracking);
    });

    startButton.addEventListener('click', () => {
        const isTracking = startButton.textContent === 'Start';
        chrome.runtime.sendMessage({ type: 'startOrPause', status: isTracking }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }
            updateButtonStyle(isTracking);
        });
    });

    clearButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'clear' }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }
            timeData = {};
            displayData();
        });
    });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .domain-entry {
            display: flex;
            justify-content: space-between;
            padding: 8px;
            border-bottom: 1px solid #eee;
        }
        .domain-name {
            font-weight: bold;
            max-width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .domain-time {
            color: #666;
        }
        .no-data {
            padding: 20px;
            color: #666;
            font-style: italic;
        }
        #start {
            transition: background-color 0.3s ease;
        }
        #start.active {
            background-color: #ff4444;
            color: white;
        }
    `;
    document.head.appendChild(style);
});