// src/popup/services/chromeMessaging.js
import { StorageService } from './storage.js';

export class ChromeMessagingService {
    constructor(trackingState) {
        this.trackingState = trackingState;
    }

    async getData() {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ type: 'getData' }, (response) => {
                if (response && response.timeData) {
                    this.trackingState.setTimeData(response.timeData);
                    resolve(response);
                }
            });
        });
    }

    async getTrackingStatus() {
        const isTracking = await StorageService.getTrackingStatus();
        this.trackingState.setIsTracking(isTracking);
        return isTracking;
    }

    async startOrPause(status) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ type: 'startOrPause', status }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    return;
                }
                this.trackingState.setIsTracking(status);
                resolve(response);
            });
        });
    }

    async setView(type) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ type }, (response) => {
                this.trackingState.setCurrentView(type === 'daughnut' ? 'donut' : 'list');
                resolve(response);
            });
        });
    }

    async clearData() {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ type: 'clear' }, () => {
                this.trackingState.setTimeData({});
                resolve();
            });
        });
    }

    async saveSession(timeData) {
        await StorageService.saveSession(timeData);
        await this.clearData();
    }

    setupMessageListener(updateDisplayCallback) {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.timeData) {
                const state = this.trackingState.getCurrentState();
                
                if ((message.type === 'timeUpdateList' && state.currentView === 'list') ||
                    (message.type === 'timeUpdateDaughnut' && state.currentView === 'donut') ||
                    !state.isTracking) {
                    this.trackingState.setTimeData(message.timeData);
                    updateDisplayCallback(message.timeData, state.currentView);
                }
            }
        });
    }
}