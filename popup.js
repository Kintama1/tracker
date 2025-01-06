document.addEventListener('DOMContentLoaded', function() {
    display_tracked(); // Load data when popup opens
    
    function display_tracked() {
        chrome.storage.local.get('siteTimeData', ({siteTimeData}) => {
            const container = document.getElementById('time-tracker');
            container.innerHTML = '';
            if (siteTimeData && Object.keys(siteTimeData).length > 0) {
                for (const [domain, time] of Object.entries(siteTimeData)) {
                    const div = document.createElement('div');
                    div.textContent = `${domain}: ${time} seconds`;
                    container.appendChild(div);
                }
            } else {
                container.textContent = 'No data found';
            }
        });
    }

    const reload = document.getElementById('reload');
    reload.addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.runtime.sendMessage({type: 'reload', url: tabs[0].url}, (response) => {
                    if (chrome.runtime.lastError) {
                        console.log(chrome.runtime.lastError.message);
                        const container = document.getElementById('time-tracker');
                        container.textContent = 'Failed to fetch data, error detected';
                        return;
                    }
                    display_tracked();
                });
            }
        });
    });
});

const clear = document.getElementById('clear');

// Check if the "clear" button exists in the DOM
if (clear) {
    clear.addEventListener('click', () => {
        chrome.storage.local.clear(() => {
            if (chrome.runtime.lastError) {
                console.error('Error clearing storage:', chrome.runtime.lastError.message);
                alert('Failed to clear storage. Please try again.');
            } else {
                console.log('Storage cleared successfully.');
                
                // Optionally update the UI to reflect the cleared storage
                const container = document.getElementById('time-tracker');
                if (container) {
                    container.textContent = 'data has been cleared';
                }
            }
        });
    });
} else {
    console.warn('Clear button not found in DOM.');
}