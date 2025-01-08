document.addEventListener('DOMContentLoaded', function() {

    const container = document.getElementById('time-tracker');
    let startTime = Date.now();
    let timeData = {};
    let currentDomain = null;
    function getDomain(url) {
        try {
            return new URL(url).hostname;
        }
        catch{
            return null;
    }
    }
    function formatTime(seconds){
        if (seconds < 60) {
            return `${seconds} s`;
        }
        if (seconds < 3600) {
            const minutes = Math.floor(seconds/60);
            const remaininSeconds = seconds % 60;
            return `${minutes}m ${remaininSeconds} s`;
        }
        const hours = Math.floor(seconds/3600);
        const remainingMinutes = Math.floor((seconds % 3600)/60);
        return `${hours}h ${remainingMinutes}m`;
    }
    //getting the initial data and displaying data
    chrome.runtime.sendMessage({type: 'getData'}, (response) => {
        console.log ('message sent: getData');
        timeData = response.timeData || {};
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]){
                currentDomain = getDomain(tabs[0].url);
                displayData();
            }
        });
    });

    function displayData(){
        container.innerHTML = '';
        //sort the data by time spent
        // it could be empty here, I am going to have to change how it loads this stuff
        const sortedDomains = Object.entries(timeData).sort(([,a], [,b] ) => b - a); // I have no idea what this means 
        console.log('just out of curiosity what do we have here', sortedDomains);
        //creating and appending elemement for each domain
        sortedDomains.forEach(([domain, time]) => {
            const domainDiv = document.createElement('div');
            domainDiv.className = `domain-entry ${domain.replace(/\./g, '-')}`;
            domainDiv.innerHTML = `
            <span class="domain-name">${domain}</span>
            <span class="domain-time">${formatTime(time)}</span>
            `;
                                    
            container.appendChild(domainDiv);
        }); 
    }       
    

    function updateDisplay(){
        if (currentDomain) {
            startTime  = Date.now();
            timeData[currentDomain] = (timeData[currentDomain] || 0) + 1;
            console.log('timeData', timeData);
            const domainDiv = document.querySelector(`.domain-entry.${currentDomain.replace(/\./g, '-')}`);
            if (domainDiv) {
                domainDiv.querySelector('.domain-time').textContent = formatTime(timeData[currentDomain]);
            } else {
                displayData();
            }
        }
    }

   //updating display while it is open
    const interval = setInterval(updateDisplay, 1000);

    //handling display when popup is closed
    window.onbeforeunload = () => {
        clearInterval(interval);
        if (currentDomain) {
            timeData[currentDomain] = (timeData[currentDomain] || 0) + Math.floor((Date.now() - startTime)/1000);
        }
    
        // Delay the message sending slightly
        setTimeout(() => {
            chrome.runtime.sendMessage({type: 'popupClosing', data: timeData}, (response) => {
                console.log('Response from background:', response);
            });
        }, 100); // 100ms delay to allow time for message sending
    };
    

    const style = document.createElement('style');
    style.textContent = `
    .domain-entry {
        display: flex;
        justify-content: space-between;
        padding : 8px;
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
    `;
    document.head.appendChild(style);
    });






const clear = document.getElementById('clear');

// Check if the "clear" button exists in the DOM
if (clear) {
    clear.addEventListener('click', () => {
        chrome.runtime.sendMessage({type : 'clear'}, (response) => {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
                return;
            }
        });
        // Optionally update the UI to reflect the cleared storage
        const container = document.getElementById('time-tracker');
        if (container) {
            container.textContent = 'data has been cleared';
        }
});
} else {
    console.warn('Clear button not found in DOM.');
}