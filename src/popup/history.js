import { ChartComponent } from './components/Chart.js';
import { ListView } from './components/ListView.js';
import { formatTime } from './utils/timeFormatter';
import './history.css';

document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('back-to-tracker');
    const sessionList = document.getElementById('session-list');
    let activeSession = null;

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }


    function createExpandedView(sessionData) {
        const expandedView = document.createElement('div');
        expandedView.className = 'session-expanded-view';
        
        // Create view toggle buttons
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'view-toggle-container';
        
        const chartButton = document.createElement('button');
        chartButton.textContent = 'Chart View';
        chartButton.className = 'view-toggle-btn active';
        
        const listButton = document.createElement('button');
        listButton.textContent = 'List View';
        listButton.className = 'view-toggle-btn';
        
        toggleContainer.appendChild(chartButton);
        toggleContainer.appendChild(listButton);
        
        // Create view container
        const viewContainer = document.createElement('div');
        viewContainer.className = 'view-container';
        
        expandedView.appendChild(toggleContainer);
        expandedView.appendChild(viewContainer);

        // Initialize with chart view
        const chart = new ChartComponent(viewContainer);
        chart.update(sessionData.timeData);
        
        // Add click handlers
        chartButton.addEventListener('click', () => {
            if (listButton.classList.contains('active')) {
                chartButton.classList.add('active');
                listButton.classList.remove('active');
                viewContainer.innerHTML = '';
                const chart = new ChartComponent(viewContainer);
                chart.update(sessionData.timeData);
            }
        });
        
        listButton.addEventListener('click', () => {
            if (chartButton.classList.contains('active')) {
                listButton.classList.add('active');
                chartButton.classList.remove('active');
                viewContainer.innerHTML = '';
                const listView = new ListView(viewContainer);
                listView.update(sessionData.timeData);
            }
        });

        return expandedView;
    }

    function loadSessions() {
        chrome.storage.local.get(['sessions'], (result) => {
            const sessions = result.sessions || [];
            sessionList.innerHTML = '';

            sessions.slice().reverse().forEach((session, index) => {
                const totalTime = Object.values(session.timeData)
                    .reduce((acc, [_, time]) => acc + time, 0);
                const sitesCount = Object.keys(session.timeData).length;

                const sessionElement = document.createElement('div');
                sessionElement.className = 'session-item';
                sessionElement.innerHTML = `
                    <div class="session-info">
                        <span>${formatDate(session.timestamp)}</span>
                        <span>${formatTime(totalTime)}</span>
                    </div>
                    <div class="sites-count">
                        ${sitesCount} sites tracked
                    </div>
                    <div class="expand-indicator">▼</div>
                `;

                let expandedView = null;

                sessionElement.addEventListener('click', () => {
                    if (activeSession && activeSession !== sessionElement) {
                        // Collapse the previously active session
                        activeSession.classList.remove('expanded');
                        activeSession.nextElementSibling?.remove();
                    }

                    sessionElement.classList.toggle('expanded');
                    
                    if (sessionElement.classList.contains('expanded')) {
                        if (!expandedView) {
                            expandedView = createExpandedView(session);
                        }
                        sessionElement.after(expandedView);
                        activeSession = sessionElement;
                    } else {
                        expandedView?.remove();
                        activeSession = null;
                    }
                });

                sessionList.appendChild(sessionElement);
            });
        });
    }

    backButton.addEventListener('click', () => {
        window.location.href = 'popup.html';
    });

    loadSessions();
});