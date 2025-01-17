import { Chart } from 'chart.js/auto';
import './popup.css';

document.addEventListener('DOMContentLoaded', function() {

    //when it first loads, it always shows the donut view
    chrome.runtime.sendMessage({ type: 'daughnut' }, (response) => {
    });

    // gets the container to display the data either in list or donut
    const container = document.getElementById('time-tracker');
    container.innerHTML = '';

    //getting the start and clear buttons
    const startButton = document.getElementById('start');
    const clearButton = document.getElementById('clear');

    //getting the daughnut and list buttons, disabling the daughnut button as it is the default view
    const DaughnutOption = document.getElementById('daughnut');
    DaughnutOption.disabled = true;
    let canvas;
    let otherDomains = [];

    function showOtherModal() {
        const modal = document.getElementById('otherModal');
        const modalBody = modal.querySelector('.modal-body'); // Fixed selector
        modalBody.innerHTML = '';

        otherDomains.forEach(([domain, [favicon, time]]) => {
            const domainDiv = document.createElement('div');
            domainDiv.className = 'domain-entry';
            domainDiv.innerHTML = `
                <img src="${favicon || 'assets/default-favicon.png'}" alt="Favicon" width="16" height="16">
                <span class="domain-name">${domain}</span>
                <span class="domain-time">${formatTime(time)}</span>
            `;
            modalBody.appendChild(domainDiv);
        });

        modal.style.display = 'block';

        // Add event listener for closing modal
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    const listOption = document.getElementById('list');

    // Chart options
    const chartOptions = {
        cutout: '70%',
        responsive: true,
        animation: false, // Disable default animations to prevent flickering
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true, // Keep tooltips enabled
                callbacks: {
                    label: function(context) {
                        const domain = context.label;
                        const time = context.raw;
                        return `${domain}: ${formatTime(time)}`;
                    }
                }
            }
        },
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        maintainAspectRatio: false
    };

    const timerPlugin = {
        id: 'timerPlugin',
        beforeDraw: (chart) => {
            const { ctx, chartArea } = chart;
            const { top, bottom, left, right } = chartArea;
            
            const centerX = (right + left) / 2;
            const centerY = (top + bottom) / 2;

            ctx.save();

            // Draw "Total Time" text
            ctx.font = '1rem Arial'; 
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#35918b    '; 
            ctx.fillText('Total Time', centerX, centerY - 10); 

            // Draw the actual time
            ctx.font = '1.5rem Arial'; 
            ctx.fillStyle = '#35918b '; 
            ctx.fillText(formatTime(totalTime), centerX, centerY + 15); 

            ctx.restore();
        }
    };

    // Interval for updating favicons on donut chart
    let faviconUpdateInterval;
    // Chart instance
    let donutChart;

    //timeData is an object that stores the time spent on each domain
    let timeData = {};
    
    // Total time spent tracking
    let totalTime = null;

    /* HELPER FUCNTION SECTIONS*/

    // Format time in seconds to a human-readable format
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

    /* Display function sections */
    
    // Draw favicons on donut chart
    function drawFaviconsOnDonut(chart, favicons) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        
        const { top, bottom, left, right } = chartArea;
        const centerX = (right + left) / 2;
        const centerY = (top + bottom) / 2;
        const radius = Math.min(chartArea.width, chartArea.height) / 2;
        const iconRadius = radius * 0.85;
        
        favicons.forEach((favicon, index) => {
            if (!chart.getDatasetMeta(0).data[index]) return;
            
            const segment = chart.getDatasetMeta(0).data[index];
           

            const rotationOffset = Math.PI/1.95 ; // Rotate by 30 degrees
            const segmentAngle = (segment.startAngle + segment.endAngle) / 2 - Math.PI / 2 + rotationOffset;
            
            const x = centerX + Math.cos(segmentAngle) * iconRadius;
            const y = centerY + Math.sin(segmentAngle) * iconRadius;
            
            loadAndDrawIcon(favicon, x, y, ctx);
        });
    }

    
    function loadAndDrawIcon(faviconUrl, x, y, ctx) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            const iconSize = 20; // Slightly larger icons
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, iconSize/2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, x - iconSize/2, y - iconSize/2, iconSize, iconSize);
            ctx.restore();
        };
        
        img.onerror = () => {
            const defaultImg = new Image();
            defaultImg.src = 'assets/default-favicon.png';
            defaultImg.onload = () => {
                const iconSize = 20;
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, iconSize/2, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(defaultImg, x - iconSize/2, y - iconSize/2, iconSize, iconSize);
                ctx.restore();
            };
        };
        
        img.src = faviconUrl;
    }
    

    //Donut display
    function donutDisplay() {
        // Clear any existing interval
        if (faviconUpdateInterval) {
            clearInterval(faviconUpdateInterval);
        }

        const maxSegments = 5;
        const colorPalette = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

        const sortedDomains = Object.entries(timeData)
            .sort(([, a], [, b]) => b[1] - a[1]);

        totalTime = sortedDomains.reduce((acc, [, [, time]]) => acc + time, 0);
        const topDomains = sortedDomains.slice(0, maxSegments - 1);
        otherDomains = sortedDomains.slice(maxSegments - 1);
        const otherTime = otherDomains.reduce((acc, [, [, time]]) => acc + time, 0);

        const labels = [...topDomains.map(([domain]) => domain), 'Others'];
        const data = [...topDomains.map(([, [, time]]) => time), otherTime];
        const favicons = topDomains.map(([, [favicon]]) => favicon || 'assets/default-favicon.png');
        if (favicons.length >= maxSegments -1) {
            favicons.push('assets/others-favicon.png');
        }

        if (!donutChart) {
            container.innerHTML = '';
            canvas = document.createElement('canvas');
            canvas.id = 'donut-chart';
            container.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            
            donutChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels,
                    datasets: [{
                        data,
                        backgroundColor: colorPalette.slice(0, maxSegments),
                    }]
                },
                options: chartOptions,
                plugins: [timerPlugin]

            });
            
            donutChart.faviconData = favicons;

            canvas.addEventListener('click', (event) => {
                const points = donutChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
                if (points.length) {
                    const firstPoint = points[0];
                    const label = donutChart.data.labels[firstPoint.index];
                    if (label === 'Others') {
                        showOtherModal();
                    }
                }
            });
        } else {
            donutChart.data.labels = labels;
            donutChart.data.datasets[0].data = data;
            donutChart.faviconData = favicons;
            donutChart.update('none');
        }

        // Initial draw of favicons
        drawFaviconsOnDonut(donutChart, favicons);

        // Set up a regular interval to redraw favicons
        faviconUpdateInterval = setInterval(() => {
            if (donutChart && donutChart.ctx && donutChart.faviconData) {
                drawFaviconsOnDonut(donutChart, donutChart.faviconData);
            }
        }, 100); // Update every 100ms to ensure icons stay visible
    }

        
    
    function listDisplay() {
        container.innerHTML = '';
        const sortedDomains = Object.entries(timeData).sort(([, a], [, b]) => b[1] - a[1]);
        
        if (sortedDomains.length === 0) {
            container.innerHTML = '<div class="no-data">No tracking data available</div>';
            return;
        }

        sortedDomains.forEach(([domain, [favicon, time]]) => {
            const domainDiv = document.createElement('div');
            domainDiv.className = `domain-entry`;
            domainDiv.innerHTML = `
                <img src="${favicon}" alt="Favicon" width="16" height="16">
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
    function updateOptionsStyle(button) {
        if (button === DaughnutOption) {
            DaughnutOption.classList.add('active');
            listOption.classList.remove('active');
            DaughnutOption.disabled = true;
            listOption.disabled = false;
        } else {
            listOption.classList.add('active');
            DaughnutOption.classList.remove('active');
            listOption.disabled = true;
            DaughnutOption.disabled = false;
    }
}
    // Listen for time updates from background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'timeUpdateList') {
            timeData = message.timeData;
            listDisplay();
        }
        if (message.type === 'timeUpdateDaughnut') {
            timeData = message.timeData;
            donutDisplay();
        }
    });

    // Get initial data
    chrome.runtime.sendMessage({ type: 'getData' }, (response) => {
        if (response && response.timeData ) {
            timeData = response.timeData;
            listDisplay();
        }
    });

    // Initialize button state
    chrome.storage.local.get(['isTracking'], (result) => {
        const isTracking = result.isTracking || false;
        updateButtonStyle(isTracking);
    });

    // Add event listeners
    DaughnutOption.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'daughnut' }, (response) => {
            updateOptionsStyle(DaughnutOption);
        });
        container.innerHTML = '';

    });

    listOption.addEventListener('click', () => {
        if (faviconUpdateInterval) {
            clearInterval(faviconUpdateInterval);
        }
        chrome.runtime.sendMessage({ type: 'list' }, (response) => {
            updateOptionsStyle(listOption);
        });
        donutChart = null;
        
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
            listDisplay();
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