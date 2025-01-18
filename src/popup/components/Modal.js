import { formatTime } from '../utils/timeFormatter';

export class Modal {
    constructor() {
        this.clearConfirmModal = document.getElementById('clearConfirmModal');
        this.otherModal = document.getElementById('otherModal');
        this.activeModal = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Global click handler for closing modals
        window.addEventListener('click', (event) => {
            if (this.activeModal && event.target === this.activeModal) {
                this.hide();
            }
        });

        // Setup other modal close button
        const otherModalCloseBtn = this.otherModal.querySelector('.close-btn');
        if (otherModalCloseBtn) {
            otherModalCloseBtn.addEventListener('click', () => this.hide());
        }

        // Prevent modal content clicks from closing the modal
        const modalContents = document.querySelectorAll('.modal-content');
        modalContents.forEach(content => {
            content.addEventListener('click', (e) => e.stopPropagation());
        });
    }

    showClearConfirm(onConfirm) {
        const confirmButton = document.getElementById('confirmClear');
        const cancelButton = document.getElementById('cancelClear');
        const saveCheckbox = document.getElementById('saveBeforeClear');

        // Remove existing listeners if any
        const newConfirmButton = confirmButton.cloneNode(true);
        const newCancelButton = cancelButton.cloneNode(true);
        confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
        cancelButton.parentNode.replaceChild(newCancelButton, cancelButton);

        // Add new listeners
        newConfirmButton.addEventListener('click', () => {
            const shouldSaveSession = saveCheckbox.checked;
            onConfirm(shouldSaveSession);
            this.hide();
        });

        newCancelButton.addEventListener('click', () => this.hide());

        this.show(this.clearConfirmModal);
    }

    showOtherDomains(otherDomains) {
        console.log( "show other domains is being called", otherDomains);
        const modalBody = this.otherModal.querySelector('.modal-body');
        modalBody.innerHTML = '';

        otherDomains.forEach(([domain, [favicon, time]]) => {
            const domainDiv = document.createElement('div');
            domainDiv.className = 'domain-entry';
            domainDiv.innerHTML = `
                <img src="${favicon || 'assets/default-favicon.png'}" 
                     alt="Favicon" 
                     width="16" 
                     height="16">
                <span class="domain-name">${domain}</span>
                <span class="domain-time">${formatTime(time)}</span>
            `;
            modalBody.appendChild(domainDiv);
        });

        this.show(this.otherModal);
    }

    show(modal) {
        this.activeModal = modal;
        modal.style.display = 'block';
    }

    hide() {
        if (this.activeModal) {
            this.activeModal.style.display = 'none';
            this.activeModal = null;
        }
    }

    // Method to check if any modal is currently visible
    isVisible() {
        return this.activeModal !== null;
    }

    // Clean up event listeners when needed
    destroy() {
        window.removeEventListener('click', this.hide);
        const otherModalCloseBtn = this.otherModal.querySelector('.close-btn');
        if (otherModalCloseBtn) {
            otherModalCloseBtn.removeEventListener('click', this.hide);
        }
    }
}