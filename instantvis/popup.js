function loadData(pack) {
    var vals = []
    var parts = pack.load.map(numeral)
    for (var i = 0; i < parts.length; i++) {
        vals.push({ label: pack.label[i], value: parts[i] })
    }
    return [{ key: "c:", values: vals }];
}

function exampleData() {
    return [{
        key: "Cumulative Return",
        values: [{
            "label": "A Label",
            "value": -29.765957771107
        }, {
            "label": "B Label",
            "value": 0
        }, {
            "label": "C Label",
            "value": 32.807804682612
        }, {
            "label": "D Label",
            "value": 196.45946739256
        }, {
            "label": "E Label",
            "value": 0.19434030906893
        }, {
            "label": "F Label",
            "value": -98.079782601442
        }, {
            "label": "G Label",
            "value": -13.925743130903
        }, {
            "label": "H Label",
            "value": -5.1387322875705
        }]
    }]
}

function draw() {
    var address = chrome.extension.getBackgroundPage().selectedAddress;
    nv.addGraph(function() {
        var chart = nv.models.multiBarHorizontalChart()
            .x(function(d) {
                return d.label }) //Specify the data accessors.
            .y(function(d) {
                return d.value })
            // .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
            .tooltips(true) //Don't show tooltips
            .showValues(false)
            //...instead, show the bar value right on top of each bar.
            .transitionDuration(350)
            .stacked(true)
            .showControls(false)
            .width(750);


        d3.select('#chart svg')
            .datum(loadData(address))
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

    nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function(d) {
                return d.label }) //Specify the data accessors.
            .y(function(d) {
                return d.value })
           .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
            .tooltips(true) //Don't show tooltips
            // .showValues(false)
            //...instead, show the bar value right on top of each bar.
            .transitionDuration(350)
            .width(750);
            // .stacked(true);


        d3.select('#chart1 svg')
            .datum(loadData(address))
            .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    });
}

window.onload = draw;