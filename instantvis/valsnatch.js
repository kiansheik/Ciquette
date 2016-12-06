
if (window == top) {
    var t = '';
    var pool = chrome.runtime.connect({name:"poop"})
    pool.onDisconnect.addListener(function(){console.log("NOOOO")})
    function gText(e) {
        t = (document.all) ? document.selection.createRange().text : document.getSelection().toString();

        pool.postMessage(t);
        console.log(t)
    }

    document.onmouseup = gText;
    if (!document.all) document.captureEvents(Event.MOUSEUP);
}