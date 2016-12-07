var selectedAddress = null;
chrome.runtime.onConnect.addListener(function(port){
  port.onMessage.addListener(
      function(address) {
          selectedAddress = address;
      });
});