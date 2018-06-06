const focusTab = (tab, onSuccess, onFailure) => {
  if (typeof onSuccess !== "function") onSuccess = function() {};
  if (typeof onFailure !== "function") onFailure = function() {};

  chrome.windows.update(tab.windowId, {
    focused: true
  }, function (win) {
    console.log("On window update:", win);

    if (!win) {
      onFailure();
      return;
    }

    chrome.tabs.highlight({
      tabs: tab.index,
      windowId: tab.windowId
    }, function(win) {
      console.log("On highlight:", win);

      onSuccess(win);
    });
  });
};

const onRedirectToStreamerTabAction = (request) => {
  console.log("Streamer URL's:", request.urls);
	
  chrome.tabs.query({ url: request.urls }, function(tabs) {
    console.log("Tabs:", tabs);

    if (tabs.length > 0) {
      var firstTab = tabs[0];
      
      focusTab(firstTab, function(win) {
        sendResponse({
          method: request.method,
          ok: true
        });
      }, function() {
        sendResponse({
          method: request.method,
          ok: false
        });
      });
    } else {
      sendResponse({
        method: request.method,
        ok: false
      });	
    }
  });
};

const onFocusTabAction = (request, sender) => {
  focusTab(sender.tab, function(win) {
    sendResponse({
      method: request.method,
      ok: true
    });
  }, function() {
    sendResponse({
      method: request.method,
      ok: false
    });
  });
};

export default class ChromeApi {

  static initBackgroundListener() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      console.log("On message:", request, sender);
    
      if(request.method === "redirect-to-streamer-tab") {
        onRedirectToStreamerTab(request);
    
        return true;
      } else if (request.method == "focus-tab") {
        onFocusTabAction(request, sender);

        return true;
      } 
    });
  }

  static getConfigData(key = 'default') {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(`btl-${key}`, function(items) {
        if (chrome.runtime.lastError)
          return reject(chrome.runtime.lastError);

        let data = items[`btl-${key}`];

        resolve(!data ? {} : data);
      });
    })
  }

  static saveConfigData(data, key = 'default') {
    return new Promise((resolve, reject) => {
      let obj = {};
  
      obj[`btl-${key}`] = data;
      chrome.storage.sync.set(obj, function() {
        if (chrome.runtime.lastError)
          return reject(chrome.runtime.lastError);

        resolve();
      });
    });
  }
}