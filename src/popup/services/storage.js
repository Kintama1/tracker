// src/popup/services/storage.js
export class StorageService {
    static async getSessions() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['sessions'], (result) => {
                resolve(result.sessions || []);
            });
        });
    }

    static async saveSession(timeData) {
        const sessions = await this.getSessions();
        sessions.push({
            timestamp: Date.now(),
            timeData: {...timeData}
        });
        return new Promise((resolve) => {
            chrome.storage.local.set({ sessions }, resolve);
        });
    }

    static async getTrackingStatus() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['isTracking'], (result) => {
                resolve(result.isTracking || false);
            });
        });
    }
}
