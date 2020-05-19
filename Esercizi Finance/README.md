# Esercizi Finance
> Gli esercizi sono svolti mediante l'uso di ajax
> In questo esercizio andiamo a prendere i dati dal sito alphavantage ottenendo una chiave gratuita che ci fa utilizzare 5 chiamate al minuto e 500 al giorno

### Developed by Castelli Luca

Funzioni Principale

```javascript
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
	

$.getJSON("http://localhost:3000/sector", function(data){
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
```
Creazione dei grafici

```javascript
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
```