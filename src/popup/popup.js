import { ChartComponent } from './components/Chart';
import { ListView } from './components/ListView';
import { Modal } from './components/Modal';
import './popup.css';


document.addEventListener('DOMContentLoaded', function() {

    const container = document.getElementById('time-tracker');
    const startButton = document.getElementById('start');
    const clearButton = document.getElementById('clear');
    const donutOption = document.getElementById('daughnut');
    const listOption = document.getElementById('list');
    const histView = document.getElementById('history');

    // State variables
    let isTracking = false;
    let timeData = {};
    let currentView = 'donut';

    // Component instances
    const modal = new Modal();
    let chart = null;
    let listView = null;

    // UI State Management
    function updateButtonStyle(isTracking) {
        startButton.textContent = isTracking ? 'Pause' : 'Start';
        if (isTracking) {
            startButton.classList.add('active');
        } else {
            startButton.classList.remove('active');
        }
    }

    function updateOptionsStyle(button) {
        if (button === donutOption) {
            donutOption.classList.add('active');
            listOption.classList.remove('active');
            donutOption.disabled = true;
            listOption.disabled = false;
            currentView = 'donut';
        } else {
            listOption.classList.add('active');
            donutOption.classList.remove('active');
            listOption.disabled = true;
            donutOption.disabled = false;
            currentView = 'list';
        }
    }

    // Display Management
    function initializeChart() {
        if (!chart) {
            chart = new ChartComponent(container, () => {
                if (chart && chart.otherDomains) {
                    modal.showOtherDomains(chart.otherDomains);
                }
            });
        }
        return chart;
    }

    function initializeListView() {
        if (!listView) {
            listView = new ListView(container);
        }
        return listView;
    }

    function updateDisplay(newTimeData, displayType = currentView) {
        timeData = newTimeData;
        
        if (displayType === 'donut') {
            if (listView) {
                listView.destroy();
                listView = null;
            }
            initializeChart().update(timeData);
        } else {
            if (chart) {
                chart.destroy();
                chart = null;
            }
            initializeListView().update(timeData);
        }
    }

    // Initialize popup
    function initializePopup() {
        chrome.runtime.sendMessage({ type: 'getData' }, (response) => {
            if (response && response.timeData) {
                timeData = response.timeData;
                if (response.display === "daughnut") {
                    updateOptionsStyle(donutOption);
                    updateDisplay(timeData, 'donut');
                } else {
                    updateOptionsStyle(listOption);
                    updateDisplay(timeData, 'list');
                }
            }
        });

        // Get tracking status to update button
        chrome.storage.local.get(['isTracking'], (result) => {
            isTracking = result.isTracking || false;
            updateButtonStyle(isTracking);
        });
    }

    // Event Handlers
    function handleStartClick() {
        const newTrackingStatus = startButton.textContent === 'Start';
        chrome.runtime.sendMessage({ type: 'startOrPause', status: newTrackingStatus }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }
            updateButtonStyle(newTrackingStatus);
            
            if (!newTrackingStatus) {
                chrome.runtime.sendMessage({ type: 'getData' }, (response) => {
                    if (response && response.timeData) {
                        updateDisplay(response.timeData);
                    }
                });
            }
        });
    }

    function handleClearData(shouldSaveSession) {
        if (shouldSaveSession) {
            const session = {
                timestamp: Date.now(),
                timeData: {...timeData}
            };
            
            chrome.storage.local.get(['sessions'], (result) => {
                const sessions = result.sessions || [];
                sessions.push(session);
                chrome.storage.local.set({ sessions }, () => {
                    chrome.runtime.sendMessage({ type: 'clear' }, () => {
                        timeData = {};
                        updateDisplay(timeData);
                    });
                });
            });
        } else {
            chrome.runtime.sendMessage({ type: 'clear' }, () => {
                timeData = {};
                updateDisplay(timeData);
            });
        }
    }

    // Setup event listeners
    donutOption.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'daughnut' }, (response) => {
            updateOptionsStyle(donutOption);
            if (response.timeData) {
                updateDisplay(response.timeData, 'donut');
            }
        });
    });

    listOption.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'list' }, (response) => {
            updateOptionsStyle(listOption);
            if (response.timeData) {
                updateDisplay(response.timeData, 'list');
            }
        });
    });

    histView.addEventListener('click', () => {
        window.location.href = 'history.html';
    });

    startButton.addEventListener('click', handleStartClick);

    clearButton.addEventListener('click', () => {
        modal.showClearConfirm(handleClearData);
    });

    // Message listener
    chrome.runtime.onMessage.addListener((message) => {
        if (message.timeData) {
            if (message.type === 'timeUpdateList' && currentView === 'list') {
                updateDisplay(message.timeData, 'list');
            } else if (message.type === 'timeUpdateDaughnut' && currentView === 'donut') {
                updateDisplay(message.timeData, 'donut');
            } else if (!isTracking) {
                updateDisplay(message.timeData);
            }
        }
    });

    // Initialize
    donutOption.disabled = true;
    container.innerHTML = '';
    initializePopup();

    // Cleanup when popup closes
    window.addEventListener('unload', () => {
        if (chart) {
            chart.destroy();
        }
        if (listView) {
            listView.destroy();
        }
        modal.destroy();
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