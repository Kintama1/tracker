import { formatTime } from '../utils/timeFormatter';

export class ListView {
    constructor(container) {
        this.container = container;
        this.scrollContainer = null;
        this.listContainer = null;
        this.initialized = false;
        this.initialize();
    }

    initialize() {
        // Clear any existing content first
        this.container.innerHTML = '';
        
        // Create scrollable container
        this.scrollContainer = document.createElement('div');
        this.scrollContainer.className = 'list-scroll-container';
        
        // Create list container for items
        this.listContainer = document.createElement('div');
        this.listContainer.className = 'domain-list-container';
        
        this.scrollContainer.appendChild(this.listContainer);
        this.container.appendChild(this.scrollContainer);
        
        this.initialized = true;
    }

    update(timeData) {
        if (!this.initialized) {
            this.initialize();
        }
        
        const sortedDomains = Object.entries(timeData)
            .sort(([, a], [, b]) => b[1] - a[1]);
        
        if (sortedDomains.length === 0) {
            this.showEmptyState();
            return;
        }

        this.renderList(sortedDomains);
    }

    showEmptyState() {
        if (this.listContainer) {
            this.listContainer.innerHTML = `
                <div class="no-data">No tracking data available</div>
            `;
        }
    }

    createDomainLink(domain) {
        const link = document.createElement('a');
        link.href = `https://${domain}`;
        link.className = 'domain-name';
        link.textContent = domain;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        return link;
    }

    renderList(sortedDomains) {
        if (!this.listContainer) return;
        
        this.listContainer.innerHTML = '';
        const fragment = document.createDocumentFragment();

        sortedDomains.forEach(([domain, [favicon, time]]) => {
            const domainDiv = document.createElement('div');
            domainDiv.className = 'domain-entry';
            
            // Create favicon container
            const faviconContainer = document.createElement('div');
            faviconContainer.className = 'favicon-container';
            
            // Create and append favicon image
            const img = document.createElement('img');
            img.src = favicon || 'assets/default-favicon.png';
            img.alt = 'Favicon';
            img.className = 'favicon-image';
            img.onerror = () => {
                img.src = 'assets/default-favicon.png';
            };
            faviconContainer.appendChild(img);
            domainDiv.appendChild(faviconContainer);

            // Create and append domain link
            const domainLink = this.createDomainLink(domain);
            domainDiv.appendChild(domainLink);
            
            // Create time
            const timeSpan = document.createElement('span');
            timeSpan.className = 'domain-time';
            timeSpan.textContent = formatTime(time);
            domainDiv.appendChild(timeSpan);

            fragment.appendChild(domainDiv);
        });

        this.listContainer.appendChild(fragment);
    }

    destroy() {
        // Properly remove all content and references
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.scrollContainer = null;
        this.listContainer = null;
        this.initialized = false;
    }
}