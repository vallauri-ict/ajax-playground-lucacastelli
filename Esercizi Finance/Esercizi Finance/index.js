"use strict";

$(document).ready(function () {

    let slctSymbol=$("#slctSymbol");
	let slctSector=$("#slctSector");
	let search=$("#search");
	let chart=$("#myChart").hide();
	let myChart= new Chart(chart,{});
	let Download=$("#download").hide();
	let Call=0;
	
	setInterval(function(){Call=0}, 60000);
	
	$.getJSON("http://localhost:3000/companies", function(data){
		for(let i=0;i<data.length;i++){
			$("<option>", {
				text: data[i]["desc"],
				value: data[i]["id"],
            }).appendTo(slctSymbol);
		}
		slctSymbol.prop("selectedIndex",-1);
    });

    slctSymbol.on("change",function() {
		if(Call<5){
			DeleteRow();
			CreateRows(0);
			getGlobalQuotes(this.value, 0);
			Call++;
		}
		else{
			alert("You can't do more than 5 call per minute!");
			slctSymbol.prop("selectedIndex",-1);
		}
    });

    search.on("keyup",function(){
		if(Call<5){
			let str=search.val();
			if(str.length>=2)
			{
				DeleteRow();
				slctSymbol.prop("selectedIndex",-1);
				getSearch(str);
			}
		}
		else{
			alert("You can't do more than 5 call per minute!");
			search.val("");
		}
    });
	
	$.getJSON("http://localhost:3000/sector", function(data)
    {
        for(let key in data)
        {
            if(key != "Meta Data")
            {
                $("<option>", {
                    text: key,
                    value: key,
                }).appendTo(slctSector);
            }
        }
		slctSector.prop("selectedIndex",-1);
    });
	
	
	slctSector.on("change", function(){
        let sector=this.value;
        $.getJSON("http://localhost:3000/chart", function(data){
			myChart.destroy();
			myChart = new Chart(chart,data);
			let labels=data["data"]["labels"]=[];
			let values=data["data"]["datasets"][0]["data"]=[];
			let backgroundColor=data["data"]["datasets"][0]["backgroundColor"]=[];
			let borderColor=data["data"]["datasets"][0]["borderColor"]=[];
			
			$.getJSON("http://localhost:3000/sector",function(metaData){
			for(let key in metaData[sector])
			{
				let color=RandomColorGenerator(false);
				labels.push(key);
				values.push(metaData[sector][key].replace("%", ""));
				backgroundColor.push(color);
				borderColor.push(color);
			}
				
			myChart.update();
			chart.show();
			Download.show();
			});
        });
    });
	
	Download.on('click', function(){ Download.prop("href", document.getElementById("myChart").toDataURL("image/jpg")); });
	
	function getGlobalQuotes(symbol, n) {
		let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=SD6OWO6PWBXQHBIU";
		$.getJSON(url, function (data) {
				let globalQuoteData = data["Global Quote"];
				$("#symbol"+n).text(globalQuoteData["01. symbol"]);
				$("#previousClose"+n).text(globalQuoteData["08. previous close"]);
				$("#open"+n).text(globalQuoteData["02. open"]);
				$("#lastTrade"+n).text(globalQuoteData["05. price"]);
				$("#lastTradeTime"+n).text(globalQuoteData["07. latest trading day"]);
				$("#change"+n).text(globalQuoteData["09. change"]);
				$("#daysLow"+n).text(globalQuoteData["04. low"]);
				$("#daysHigh"+n).text(globalQuoteData["03. high"]);
				$("#volume"+n).text(globalQuoteData["06. volume"]);
			}
		);
	}

	function getSearch(keywords) {
		let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + keywords + "&apikey=SD6OWO6PWBXQHBIU";
		$.getJSON(url, function (data) {
			let dataMatches=data["bestMatches"];
			let length=5-Call;
			if(dataMatches.length<=5-Call) length=dataMatches.length;
				for(let i=0;i<length; i++)
				{					
					CreateRows(i);
					getGlobalQuotes(dataMatches[i]["1. symbol"], i);
					Call++;
				}
		});
	}

	function CreateRows(n) {
		let tr=$("<tr>").addClass("deletableRows");

		$("<td>").prop("id", "symbol"+n).appendTo(tr);
		$("<td>").prop("id", "lastTrade"+n).appendTo(tr);
		$("<td>").prop("id", "lastTradeTime"+n).appendTo(tr);
		$("<td>").prop("id", "change"+n).appendTo(tr);
		$("<td>").prop("id", "open"+n).appendTo(tr);
		$("<td>").prop("id", "previousClose"+n).appendTo(tr);
		$("<td>").prop("id", "daysLow"+n).appendTo(tr);
		$("<td>").prop("id", "daysHigh"+n).appendTo(tr);
		$("<td>").prop("id", "volume"+n).appendTo(tr);
		tr.appendTo($("#table"));
	}

	function DeleteRow() { $(".deletableRows").remove(); }

	function Random(min, max) { return Math.floor((max - min + 1) * Math.random()) + min; }

	function RandomColorGenerator(isTransparent, transFirstValue=Random(0,1), transMin=1, transMax=8){
		if(isTransparent)
		{
			let transparentValue;
			if(transFirstValue==0)
			{
				let str=transFirstValue + "."+ Random(transMin, transMax);
				transparentValue=parseFloat(str);
			}
			else
				transparentValue=transFirstValue;
			return "rgba(" + Random(50, 200) + ", " + Random(50, 200) + ", " + Random(50, 200) + ", " + transparentValue +")";
		}
		else
			return "rgb(" + Random(50, 200) + ", " + Random(50, 200) + ", " + Random(50, 200) + ")";
	}
});