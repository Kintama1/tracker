import './history.css';
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('back-to-tracker');
    const sessionList = document.getElementById('session-list');

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    function formatDuration(seconds) {
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}m ${remainingSeconds}s`;
        }
        const hours = Math.floor(seconds / 3600);
        const remainingMinutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${remainingMinutes}m`;
    }

    function loadSessions() {
        chrome.storage.local.get(['sessions'], (result) => {
            const sessions = result.sessions || [];
            sessionList.innerHTML = '';

            sessions.forEach((session, index) => {
                const totalTime = Object.values(session.timeData)
                    .reduce((acc, [_, time]) => acc + time, 0);
                const sitesCount = Object.keys(session.timeData).length;

                const sessionElement = document.createElement('div');
                sessionElement.className = 'session-item';
                sessionElement.innerHTML = `
                    <div class="session-info">
                        <span>${formatDate(session.timestamp)}</span>
                        <span>${formatDuration(totalTime)}</span>
                    </div>
                    <div style="color: #666; margin-top: 5px;">
                        ${sitesCount} sites tracked
                    </div>
                `;

                sessionElement.addEventListener('click', () => {
                    // TODO: Implement session detail view
                    console.log('Session clicked:', session);
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