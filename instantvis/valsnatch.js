if (window == top) {
    var t = '';
    var pool = chrome.runtime.connect({ name: "pool" })

    function gText(e) {
        // console.log("arg", e)
        t = (document.all) ? document.selection.createRange().text : document.getSelection().toString();
        if(t===""){return}
        m = t.trim().match(/[^\r\n]+/g).map(function(str) {
            return str.split(/\t+/g)
        })
        // console.log("bef", t)
        // console.table(m)
        if (m.length == 1) {
            var tsplit = t.split(/\s+/g)
            pool.postMessage({ load: tsplit, label: Array.apply(null, { length: tsplit.length }).map(Number.call, Number + 1) });
            // console.table(t.split(/\s+/g));
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

            pool.postMessage({ type: "select", load: load, label: label })
            // console.table({ type: "select", label: label, load: load })
        }


    }
    document.onmouseup = gText;
    if (!document.all) document.captureEvents(Event.MOUSEUP);
}
var elements = document.getElementsByTagName("table");
// console.log("TABLES FOUND: ", elements.length)
// console.log("TABLES BOOOP: ", elements)

var strictDetect = toArray(elements).map(function(e) {
    return tableToArray(e, true);
}).filter(function(e) {
    return e !== null;
});

// console.log("strict", strictDetect)

strictDetect.map(function(tbl) {
    var id = randomString(6);
    $(tbl.src).after('<div id="' + id + '"><svg perserveAspectRatio="xMinYMid" style="height: 200px;padding-bottom: 10px;"></svg></div>');
    nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function(d) {
                return d.label
            }) //Specify the data accessors.
            .y(function(d) {
                return d.value
            })
            .staggerLabels(true) //Too many bars and not enough room? Try staggering labels.
            .tooltips(true) //Don't show tooltips
            // .showValues(false)
            //...instead, show the bar value right on top of each bar.
            .transitionDuration(350)
            .noData("...Nothing valid selected...")

        // .stacked(true);


        d3.select("#" + id + ' svg')
            .datum(strictd3(tbl, chart, 1, 0))
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
});

function toArray(obj) {
    var array = [];
    // iterate backwards ensuring that length is an UInt32
    for (var i = obj.length >>> 0; i--;) {
        array[i] = obj[i];
    }
    return array;
}

function isEven(arr) {
    for (var i in arr) {
        if (arr[i].length !== arr[0].length) {
            return false;
        }
    }
    return true;
}

function strictd3(tbl, chart, x, y) {
    var keys = Object.keys(tbl).filter(function(e) {
        return e !== "src" })
    //alert(keys[x] + ", " + keys[y])
    chart.xAxis
        .axisLabel(keys[x]);
    chart.yAxis
        .axisLabel(keys[y]);
    var values = [];
    for (var i in tbl[keys[x]]) {
        values.push({ label: tbl[keys[y]][i], value: numeral(tbl[keys[x]][i]) });
    }
    // console.log(values)
    return [{ key: keys[x], values: values }];
}

function randomString(length) {
    var mask = 'abcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

function tableToArray(e, strict) {
    var chart = { th: [], td: [] },
        res = { src: e };
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
    if (chart.th.length === 1 && isEven(chart.td) && ((chart.td[0].length === chart.th[0].length) || !strict)) {
        for (var i in chart.th[0]) {
            var label = chart.th[0][i];
            res[label] = [];
            for (var j in chart.td) {
                res[label].push(chart.td[j][i]);
            }
        }
        // // console.log(isEven(chart.th), isEven(chart.td), chart, res);
    } else {
        return null;
    }
    return res;
}