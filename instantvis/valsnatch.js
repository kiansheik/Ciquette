if (window == top) {
    var t = '';
    var pool = chrome.runtime.connect({ name: "pool" })

    function gText(e) {
        console.log("arg", e)
        t = (document.all) ? document.selection.createRange().text : document.getSelection().toString();
        m = t.trim().match(/[^\r\n]+/g).map(function(str) {
            return str.split(/\t+/g)
        })
        console.log("bef", t)
        console.table(m)
        if (m.length == 1) {
            var tsplit = t.split(/\s+/g)
            pool.postMessage({ load: tsplit, label: Array.apply(null, { length: tsplit.length }).map(Number.call, Number + 1) });
            console.table(t.split(/\s+/g));
        } else if (m.length >= 2) {
            var load = [],
                label = [];
            var start = m[0].length;
            var end = m[m.length - 1].length - 1;
            for (var i = 0; i < m.length - 1; i++) {
                label.push(m[i][m[i].length - start]);
                load.push(m[i][end]);
            }
            label.push(m[m.length - 1][m[m.length - 2].length - m[0].length]);
            load.push(m[m.length - 1][end]);

            pool.postMessage({ load: load, label: label })
            console.table({ label: label, load: load })
        }


    }
    document.onmouseup = gText;
    if (!document.all) document.captureEvents(Event.MOUSEUP);
}
var elements = document.getElementsByTagName("table");
console.log("TABLES FOUND: ", elements.length)
console.log("TABLES BOOOP: ", elements)

var td = toArray(elements).map(function(e) {
    var chart = { th: [], td: [] };
    var tr = e.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        var th = tr[i].getElementsByTagName("th");
        if (th.length > 0) {
            var th = toArray(th).map(function(t) {
                return $(t).text();
            });
            chart["th"].push(th);
        }
        var td = tr[i].getElementsByTagName("td");
        if (td.length > 0) {
            var td = toArray(td).map(function(t) {
                return $(t).text();
            });
            chart["td"].push(td);
        }
        
    }
    console.log("churt", chart);
    var last = tr[tr.length - 1];
    console.log(last)
    return toArray(tr).map(function(t) {
        return t.getElementsByTagName("td");
    });
});



console.log("tbody", td);

function toArray(obj) {
    var array = [];
    // iterate backwards ensuring that length is an UInt32
    for (var i = obj.length >>> 0; i--;) {
        array[i] = obj[i];
    }
    return array;
}

function tableToArray(tbl, opt_cellValueGetter) {

}