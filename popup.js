chrome.runtime.sendMessage({type: "GET_CURRENT_TAB"}, (response) => {
    const tab = response.tab;
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return ;
    }
    if (tab) {
    
        document.getElementById("tab-info").textContent = `
        Title: ${tab.title}
        URL: ${tab.url} 
        `;
    } else {
        document.getElementById("tab-info").textContent = "No tab found";
    }
});