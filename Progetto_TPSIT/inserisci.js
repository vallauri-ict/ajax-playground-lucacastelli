"use strict";

$(function () {	
    $("#invia").on("click",function(){
        let name=$("#nome").text;
        let titolo=$("#titolo").text;
        let feat=$("#feat").text;
        let _inserisciDati = inviaRichiesta("post", "server/inserisciDati.php",{"nome": nome,"titolo":titolo,"feat":feat});
            _inserisciDati.done(function(){
            alert("Dati inseriti correttamente");
            window.location.href("index.html");
        });
    });

	$("#btnLogout").on("click", function(){
		let _richiestaLogout = inviaRichiesta("POST", "server/logout.php");		
		_richiestaLogout.fail(error);
		_richiestaLogout.done(function (data) { 
			if (data["ok"]==true){
				alert("Sei stato disconnesso correttamente");	
			    window.location.href="login.html";
			}
		});
	})
});
