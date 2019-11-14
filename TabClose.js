chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: 'close-other-tabs',
        title: 'Close other tabs',
        contexts: [
            'all'
        ]
    });

    chrome.contextMenus.create({
        id: 'close-all-tabs',
        title: 'Close all tabs',
        contexts: [
            'all'
        ]
    });

    chrome.contextMenus.create({
        id: 'close-right-tabs',
        title: 'Close tabs to the right',
        contexts: [
            'all'
        ]
    });

    chrome.contextMenus.create({
        id: 'close-left-tabs',
        title: 'Close tabs to the left',
        contexts: [
            'all'
        ]
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case 'close-other-tabs':
            closeOtherTabs();
            break;
        case 'close-all-tabs':
            closeAllTabs();
            break;
        case 'close-left-tabs':
            closeLeftTabs();
            break;
        case 'close-right-tabs':
            closeRightTabs();
            break;
    }
});

function performActionOnTab(tabCallback) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) { tabCallback(tabArray[0]); });
}

function closeOtherTabs() {
    performActionOnTab(function (currentTab) {
        if (currentTab) {
            chrome.tabs.query({ currentWindow: true, pinned: false }, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].index != currentTab.index) {
                        chrome.tabs.remove(tabs[i].id, null);
                    }
                }
            });
        }
    });
}

function closeLeftTabs() {
    performActionOnTab(function (currentTab) {
        if (currentTab) {
            chrome.tabs.query({ currentWindow: true, pinned: false }, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].index < currentTab.index) {
                        chrome.tabs.remove(tabs[i].id, null);
                    };
                }
            });
        }
    });
}

function closeRightTabs() {
    performActionOnTab(function (currentTab) {
        if (currentTab) {
            chrome.tabs.query({ currentWindow: true, pinned: false }, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].index > currentTab.index) {
                        chrome.tabs.remove(tabs[i].id, null);
                    }
                }
            });
        };
    });
}

function closeAllTabs() {
    performActionOnTab(function (currentTab) {
        if (currentTab) {
            chrome.tabs.query({ currentWindow: true, pinned: false }, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    chrome.tabs.remove(tabs[i].id, null);
                }
            });
        }
    });
}