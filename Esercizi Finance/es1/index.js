"use strict";

$(document).ready(function () {
    let symbol=$("#Symbol")
    symbol.prop("selectedIndex","-1");
    symbol.on("change",function() {
        getGlobalQuotes(this.value)
    })
})

function getGlobalQuotes(symbol) {
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=KCD28HHJSQ0HBBDD"
    $.getJSON(url, function (data) {
            let globalQuote = data["Global Quote"]
            $("#symbol").text(globalQuote["01. symbol"])
            $("#previousClose").text(globalQuote["08. previous close"])
            $("#open").text(globalQuote["02. open"])
            $("#lastTrade").text(globalQuote["05. price"])
            $("#lastTradeTime").text(globalQuote["07. latest trading day"])
            $("#change").text(globalQuote["09. change"])
            $("#daysLow").text(globalQuote["04. low"])
            $("#daysHigh").text(globalQuote["03. high"])
            $("#volume").text(globalQuote["06. volume"])
        }
    )
}