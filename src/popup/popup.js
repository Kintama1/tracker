import { TrackingState } from './state/trackingState.js';
import { ChromeMessagingService } from './services/chromeMessaging.js';
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

    // Initialize state and services
    const trackingState = new TrackingState();
    const messagingService = new ChromeMessagingService(trackingState);

    // Component instances
    const modal = new Modal();
    let chart = null;
    let listView = null;

    // UI State Management
    function updateButtonStyle(isTracking) {
        startButton.textContent = isTracking ? 'Pause' : 'Start';
        startButton.classList.toggle('active', isTracking);
    }

    function updateOptionsStyle(button) {
        const isDonut = button === donutOption;
        donutOption.classList.toggle('active', isDonut);
        listOption.classList.toggle('active', !isDonut);
        donutOption.disabled = isDonut;
        listOption.disabled = !isDonut;
        trackingState.setCurrentView(isDonut ? 'donut' : 'list');
    }

    // Display Management
    function initializeChart() {
        if (!chart) {
            chart = new ChartComponent(container, () => {
                if (chart?.otherDomains) {
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

    function updateDisplay(newTimeData, displayType = trackingState.currentView) {
        trackingState.setTimeData(newTimeData);
        
        if (displayType === 'donut') {
            if (listView) {
                listView.destroy();
                listView = null;
            }
            initializeChart().update(newTimeData);
        } else {
            if (chart) {
                chart.destroy();
                chart = null;
            }
            initializeListView().update(newTimeData);
        }
    }

    // Initialize popup
    async function initializePopup() {
        const response = await messagingService.getData();
        if (response?.timeData) {
            if (response.display === "daughnut") {
                updateOptionsStyle(donutOption);
                updateDisplay(response.timeData, 'donut');
            } else {
                updateOptionsStyle(listOption);
                updateDisplay(response.timeData, 'list');
            }
        }

        const isTracking = await messagingService.getTrackingStatus();
        updateButtonStyle(isTracking);
    }

    // Event Handlers
    async function handleStartClick() {
        const newTrackingStatus = startButton.textContent === 'Start';
        await messagingService.startOrPause(newTrackingStatus);
        updateButtonStyle(newTrackingStatus);
        
        if (!newTrackingStatus) {
            const response = await messagingService.getData();
            if (response?.timeData) {
                updateDisplay(response.timeData);
            }
        }
    }

    // Setup event listeners
    donutOption.addEventListener('click', async () => {
        const response = await messagingService.setView('daughnut');
        updateOptionsStyle(donutOption);
        if (response?.timeData) {
            updateDisplay(response.timeData, 'donut');
        }
    });

    listOption.addEventListener('click', async () => {
        const response = await messagingService.setView('list');
        updateOptionsStyle(listOption);
        if (response?.timeData) {
            updateDisplay(response.timeData, 'list');
        }
    });

    histView.addEventListener('click', () => {
        window.location.href = 'history.html';
    });

    startButton.addEventListener('click', handleStartClick);

    clearButton.addEventListener('click', () => {
        modal.showClearConfirm(async (shouldSaveSession) => {
            if (shouldSaveSession) {
                await messagingService.saveSession(trackingState.timeData);
            } else {
                await messagingService.clearData();
            }
            updateDisplay({});
        });
    });

    // Initialize
    donutOption.disabled = true;
    container.innerHTML = '';
    initializePopup();
    messagingService.setupMessageListener(updateDisplay);

    // Cleanup
    window.addEventListener('unload', () => {
        chart?.destroy();
        listView?.destroy();
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