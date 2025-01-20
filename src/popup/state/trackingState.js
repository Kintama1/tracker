export class TrackingState {
    constructor() {
        this.isTracking = false;
        this.timeData = {};
        this.currentView = 'donut';
    }

    setIsTracking(status) {
        this.isTracking = status;
    }

    setTimeData(data) {
        this.timeData = data;
    }

    setCurrentView(view) {
        this.currentView = view;
    }

    getCurrentState() {
        return {
            isTracking: this.isTracking,
            timeData: this.timeData,
            currentView: this.currentView
        };
    }
}