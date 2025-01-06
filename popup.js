chrome.storage.local.get('siteTimeData', ({siteTimeData}) => {
    const container  = document.getElementById('time-tracker');
    container.innerHTML = '';
    if (siteTimeData) {
        for ( const [domain, time] of Object.entries(siteTimeData)) {
            const div = document.createElement('div');
            div.textContent = `${domain}: ${time} seconds`;
            container.appendChild(div);
        }
    }
    else {
            container.textContent = 'No data found';
        }
    });