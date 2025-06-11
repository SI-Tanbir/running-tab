document.addEventListener('DOMContentLoaded', function () {
    let currentTabs = []; // Store tabs for later use

    // Get the current window's tabs only
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        currentTabs = tabs; // Store tabs
        const tabList = document.getElementById('tabList');

        // Clear any existing content
        tabList.innerHTML = '';

        // Add a header showing the number of tabs
        const header = document.createElement('div');
        header.style.marginBottom = '10px';
        header.style.fontSize = '14px';
        header.style.color = '#666';
        header.textContent = `Showing ${tabs.length} tabs from current window`;
        tabList.parentNode.insertBefore(header, tabList);

        // Add each tab
        tabs.forEach(tab => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = tab.url;
            a.textContent = tab.title || tab.url;
            a.target = '_blank';

            // Add a small icon if available
            if (tab.favIconUrl) {
                const img = document.createElement('img');
                img.src = tab.favIconUrl;
                img.style.width = '16px';
                img.style.height = '16px';
                img.style.marginRight = '8px';
                img.style.verticalAlign = 'middle';
                li.appendChild(img);
            }

            li.appendChild(a);
            tabList.appendChild(li);
        });
    });

    // Add copy functionality
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', function () {
        // Create a string of all URLs
        const urls = currentTabs.map(tab => tab.url).join('\n');

        // Copy to clipboard
        navigator.clipboard.writeText(urls).then(() => {
            // Visual feedback
            copyButton.textContent = 'Copied!';
            copyButton.classList.add('copied');

            // Reset button after 2 seconds
            setTimeout(() => {
                copyButton.textContent = 'Copy All URLs';
                copyButton.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            copyButton.textContent = 'Failed to copy';
            setTimeout(() => {
                copyButton.textContent = 'Copy All URLs';
            }, 2000);
        });
    });
}); 