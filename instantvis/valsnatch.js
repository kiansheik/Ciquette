if (window == top) {
    var t = '';
    var pool = chrome.runtime.connect({ name: "pool" })

    function gText(e) {
        t = (document.all) ? document.selection.createRange().text : document.getSelection().toString();
        m = t.trim().match(/[^\r\n]+/g).map(function(str){return str.split(/\t+/g)})
        console.log("bef", t)
        console.table(m)
        if (m.length == 1) {
            var tsplit = t.split(/\s+/g)
            pool.postMessage({load:tsplit,label:Array.apply(null, {length: tsplit.length}).map(Number.call, Number+1)});
            console.table(t.split(/\s+/g));
        } else if (m.length >= 2) {
            var load = [],
                label = [];
            var start = m[0].length;
            var end = m[m.length - 1].length - 1;
            for (var i = 0; i < m.length-1; i++) {
                label.push(m[i][m[i].length-start]);
                load.push(m[i][end]);
            }
            label.push(m[m.length-1][m[m.length-2].length-m[0].length]);
            load.push(m[m.length-1][end]);
            
            pool.postMessage({load:load, label:label})
            console.table({label:label, load:load})
        }
    }

    document.onmouseup = gText;
    if (!document.all) document.captureEvents(Event.MOUSEUP);
}