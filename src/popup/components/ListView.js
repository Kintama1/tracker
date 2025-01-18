import { formatTime } from '../utils/timeFormatter';

export class ListView {
    constructor(container) {
        this.container = container;
    }

    update(timeData) {
        this.container.innerHTML = '';
        const sortedDomains = Object.entries(timeData)
            .sort(([, a], [, b]) => b[1] - a[1]);
        
        if (sortedDomains.length === 0) {
            this.showEmptyState();
            return;
        }

        this.renderList(sortedDomains);
    }

    showEmptyState() {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'no-data';
        emptyDiv.textContent = 'No tracking data available';
        this.container.appendChild(emptyDiv);
    }

    renderList(sortedDomains) {
        const fragment = document.createDocumentFragment();

        sortedDomains.forEach(([domain, [favicon, time]]) => {
            const domainDiv = document.createElement('div');
            domainDiv.className = 'domain-entry';
            
            // Create and append favicon image
            const img = document.createElement('img');
            img.src = favicon || 'assets/default-favicon.png';
            img.alt = 'Favicon';
            img.width = 16;
            img.height = 16;
            img.onerror = () => {
                img.src = 'assets/default-favicon.png';
            };
            domainDiv.appendChild(img);

            // Create and append domain name
            const domainName = document.createElement('span');
            domainName.className = 'domain-name';
            domainName.textContent = domain;
            domainDiv.appendChild(domainName);

            // Create and append time
            const timeSpan = document.createElement('span');
            timeSpan.className = 'domain-time';
            timeSpan.textContent = formatTime(time);
            domainDiv.appendChild(timeSpan);

            fragment.appendChild(domainDiv);
        });

        this.container.appendChild(fragment);
    }

    // Method to clean up any resources or event listeners
    destroy() {
        this.container.innerHTML = '';
    }
}