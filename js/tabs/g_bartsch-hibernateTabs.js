(function () {
  //const HIBERNATE_TIMEOUT = 15 * 1000; // 15 seconds
	//const HIBERNATE_TIMEOUT = 15 * 1000; // 15 seconds
	//const HIBERNATE_TIMEOUT = 30 * 1000; // 30 seconds
	//const HIBERNATE_TIMEOUT = 60 * 1000; // 1 minute
	//const HIBERNATE_TIMEOUT = 2 * 60 * 1000; // 2 minutes
	const HIBERNATE_TIMEOUT = 3 * 60 * 1000; // 3 minutes
	//const HIBERNATE_TIMEOUT = 4 * 60 * 1000; // 4 minutes
	//const HIBERNATE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  // Sites to exclude from hibernation (use partial URL matches) - E:Felix
  const EXCLUDED_SITES = [
    'make.powerautomate.com',
    'make.powerapps.com',
    'outlook.office.com',
    'youtube.com',
    'music.youtube.com'
  ];

  function hibernateInactiveTabs() {
    const tabs = chrome.tabs.query({ currentWindow: true, active: false }, (tabs) => {
      tabs.forEach((tab) => {
        // Skip tabs that are currently tiled
        if (tab.vivExtData && tab.vivExtData.indexOf('"tile":') !== -1) {
          return;
        }

        // Skip tabs from excluded sites
        if (EXCLUDED_SITES.some(site => tab.url.includes(site))) {
          return;
        }

        const elapsedTime = Date.now() - tab.lastAccessed;
        if (elapsedTime >= HIBERNATE_TIMEOUT) {
          chrome.tabs.discard(tab.id);
        }
      });
    });
  }

  setInterval(hibernateInactiveTabs, HIBERNATE_TIMEOUT / 2);
})();
