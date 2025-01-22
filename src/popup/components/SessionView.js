import { ChartComponent } from './Chart';
import { ListView } from './ListView';
// not used yet, but will be used to refractor histroy.js in the future
export class SessionView {
    constructor(sessionElement, sessionData) {
        this.sessionElement = sessionElement;
        this.sessionData = sessionData;
        this.expanded = false;
        this.currentView = 'chart'; // Default view
        this.viewContainer = null;
        this.chart = null;
        this.listView = null;
        
        this.setupExpandedView();
    }

    setupExpandedView() {
        // Create expanded view container
        const expandedView = document.createElement('div');
        expandedView.className = 'session-expanded-view';
        expandedView.style.display = 'none';
        
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
        this.viewContainer = document.createElement('div');
        this.viewContainer.className = 'view-container';
        
        expandedView.appendChild(toggleContainer);
        expandedView.appendChild(this.viewContainer);
        
        // Add click handlers
        chartButton.addEventListener('click', () => {
            this.switchView('chart');
            chartButton.classList.add('active');
            listButton.classList.remove('active');
        });
        
        listButton.addEventListener('click', () => {
            this.switchView('list');
            listButton.classList.add('active');
            chartButton.classList.remove('active');
        });
        
        // Insert expanded view after the session element
        this.sessionElement.after(expandedView);
        this.expandedView = expandedView;
        
        // Add click handler to session element
        this.sessionElement.addEventListener('click', () => this.toggleExpand());
    }

    toggleExpand() {
        this.expanded = !this.expanded;
        this.expandedView.style.display = this.expanded ? 'block' : 'none';
        this.sessionElement.classList.toggle('expanded');
        
        if (this.expanded) {
            this.switchView(this.currentView);
        } else {
            this.destroyCurrentView();
        }
    }

    switchView(viewType) {
        this.destroyCurrentView();
        this.currentView = viewType;
        
        if (viewType === 'chart') {
            this.chart = new ChartComponent(this.viewContainer);
            this.chart.update(this.sessionData.timeData);
        } else {
            this.listView = new ListView(this.viewContainer);
            this.listView.update(this.sessionData.timeData);
        }
    }

    destroyCurrentView() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        if (this.listView) {
            this.listView.destroy();
            this.listView = null;
        }
    }

    destroy() {
        this.destroyCurrentView();
        this.expandedView.remove();
    }
}
