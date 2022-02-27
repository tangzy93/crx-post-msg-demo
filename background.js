chrome.runtime.onMessage.addListener(function (request, sender, sendResp) {
  console.log('background.js request:', request)
  console.log('background.js sender:', sender)
  sendResp({
    action: 'resp',
    payload: {
      msg: '你好世界'
    }
  })
})

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
    console.log('back resp msg', response);
  });
  chrome.tabs.sendRequest(tab.id, {greeting: "hello"}, function(response) {
    console.log('back resp req', response);
  });
});

// chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
//   console.log('request from content script', request)
//   // sendResponse()
// })
