console.log('hi, i am inject.js')
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded')
  // 新建script标签，设置define-postman.js
  injectScript();
})

function injectScript() {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = chrome.extension.getURL('js/define-postman.js');
  document.head.appendChild(script);
}

/* 注册target page发来的消息事件 */
window.addEventListener("message", function (e) {
  console.log('content script received msg from target page', e.data)
  const {action, payload} = e.data;
  sendMsgToBackground(action, payload);
});

function sendMsgToBackground(action, payload) {
  chrome.runtime.sendMessage({
    action,
    payload
  }, function (resp) {
    console.log('resp from background', resp)
  })
}

/* 注册background.js发送事件的回调 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResp) {
  console.log('received from background.js -- onMessage', request);
  sendResp({
    hi: 'hi'
  })
});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  console.log('resceived from background.js -- onRequest', request)
  sendResponse({
    hi: '你好'
  })
});

