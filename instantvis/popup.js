// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be

function draw(){
var address = chrome.extension.getBackgroundPage().selectedAddress;
	nv.addGraph(function() {
	  var chart = nv.models.discreteBarChart()
	      .x(function(d) { return d.label })    //Specify the data accessors.
	      .y(function(d) { return d.value })
	      .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
	      .tooltips(false)        //Don't show tooltips
	      .showValues(true)       //...instead, show the bar value right on top of each bar.
	      .transitionDuration(350)
	      ;

	  d3.select('#chart svg')
	      .datum(loadData(address))
	      .call(chart);

	  nv.utils.windowResize(chart.update);

	  return chart;
	});
	loadData(address)
	//Each bar represents a single discrete quantity.
	function loadData(address){
		var vals = []
		var parts = address.split(/\s+/g).map(numeral)
		for(var i=0;i<parts.length;i++){
			vals.push({label:i+1, value:parts[i]})
		}
		return [{key: "Selected Data", values:vals}];
	}
	function exampleData() {
	 return  [ 
	    {
	      key: "Cumulative Return",
	      values: [
	        { 
	          "label" : "A Label" ,
	          "value" : -29.765957771107
	        } , 
	        { 
	          "label" : "B Label" , 
	          "value" : 0
	        } , 
	        { 
	          "label" : "C Label" , 
	          "value" : 32.807804682612
	        } , 
	        { 
	          "label" : "D Label" , 
	          "value" : 196.45946739256
	        } , 
	        { 
	          "label" : "E Label" ,
	          "value" : 0.19434030906893
	        } , 
	        { 
	          "label" : "F Label" , 
	          "value" : -98.079782601442
	        } , 
	        { 
	          "label" : "G Label" , 
	          "value" : -13.925743130903
	        } , 
	        { 
	          "label" : "H Label" , 
	          "value" : -5.1387322875705
	        }
	      ]
	    }
	  ]

	}
}

window.onload = draw;