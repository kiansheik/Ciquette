var selectedAddress = null;

chrome.runtime.onConnect.addListener(function(port){
  if(port.name == 'pool')
  port.onMessage.addListener(
      function(address) {
          selectedAddress = address;
      });
});