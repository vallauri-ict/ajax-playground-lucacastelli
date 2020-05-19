# Esercizi Finance
> Gli esercizi sono svolti mediante l'uso di ajax

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
