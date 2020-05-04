"use script"
let _table;

$(document).ready(function () {
    let _cmbSymbol = $("#cmbSymbol");
    let _txtCerca = $("#txtCerca");
    _table = $("#table"); 
    _cmbSymbol.prop("selectedIndex", "-1");
    _cmbSymbol.on("change", function () {
        _txtCerca.prop("value", "");
        getGlobalQuotes(this.value);
    });
    _txtCerca.on("keyup", function () {
        _cmbSymbol.prop("selectedIndex", "-1");
        getSymbolSearch(this.value);
    });
});

function getGlobalQuotes(symbol) {
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=KCD28HHJSQ0HBBDD";
    $.getJSON(url, function (data) {
            let globalQuoteData = data["Global Quote"];
            createHeadTableCmb(globalQuoteData);
            let tr = $("<tr>").appendTo("#table");
            $("<td>").text(globalQuoteData["01. symbol"]).appendTo(tr);
            $("<td>").text(globalQuoteData["02. open"]).appendTo(tr);
            $("<td>").text(globalQuoteData["03. high"]).appendTo(tr);
            $("<td>").text(globalQuoteData["04. low"]).appendTo(tr);
            $("<td>").text(globalQuoteData["05. price"]).appendTo(tr);
            $("<td>").text(globalQuoteData["06. volume"]).appendTo(tr);
            $("<td>").text(globalQuoteData["07. latest trading day"]).appendTo(tr);
            $("<td>").text(globalQuoteData["08. previous close"]).appendTo(tr);
            $("<td>").text(globalQuoteData["09. change"]).appendTo(tr);
            $("#wrapper").show();
        }
    );
}

function getSymbolSearch(str) {
    if (str.length >= 2) {
        let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + str + "&apikey=KCD28HHJSQ0HBBDD";
        $.getJSON(url, function (data) {
                let bestMatches = data["bestMatches"];
                if (bestMatches.length == 0) {
                    $("#wrapper").hide();
                    $(".table").remove();
                    let timer = setTimeout(function () {
                        alert("Nessuna azienda corrispondente alle ricerche.");
                    }, 700);
                }
                else {
                    createHeadTableSearch(bestMatches[0]);
                    for (let i = 0; i < bestMatches.length; i++) {
                        let tr = $("<tr>").appendTo("#table");
                        $("<td>").text(bestMatches[i]["1. symbol"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["2. name"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["3. type"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["4. region"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["5. marketOpen"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["6. marketClose"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["7. timezone"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["8. currency"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["9. matchScore"]).appendTo(tr);
                        $("#wrapper").show();
                    }
                }
                
            }
        );
    }   
}

function createHeadTableCmb(globalQuoteData) {
    $(".table").remove();
    let _table = $("<table>").attr("id", "table").addClass("table").appendTo("#wrapper");
    let GQData = Object.keys(globalQuoteData);
    let _tr = $("<tr>").appendTo(_table);
    for (let i = 0; i < GQData.length - 1; i++) {
        let _th = $("<th>").text(GQData[i].substr(3).toUpperCase()).appendTo(_tr);
    }
}

function createHeadTableSearch(bestMatches) {
    $(".table").remove();
    let _table = $("<table>").attr("id", "table").addClass("table").appendTo("#wrapper");
    let array = Object.keys(bestMatches);
    let _tr = $("<tr>").appendTo(_table);
    for (let i = 0; i < array[0].length; i++) {
        let _th = $("<th>").text(array[i].substr(3).toUpperCase()).appendTo(_tr);
    }
}
