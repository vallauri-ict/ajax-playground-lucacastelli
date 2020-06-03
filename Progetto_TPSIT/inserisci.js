"use strict";

$(function () {	
    let lenght;
    let _richiestaCanzoni = inviaRichiesta("get", "server/elencoTotCanzoni.php");
    
    _richiestaCanzoni.done(function (data) {
        {
            console.log(data);
            lenght=data.data[data.data.length-1]["CodCantanti"];
            console.log(lenght);
        }

        
        
    });
    $("#invia").on("click",function(){
        let nome=$("#name").val();
        let titolo=$("#titolo").val();
        let feat=$("#feat").val();
        console.log(nome+" "+titolo+" "+feat);
        let _inserisciDati = inviaRichiesta("get", "server/inserisciDati.php",{"nome": nome,"titolo":titolo,"feat":feat,"num":parseInt(lenght)+1});
        _inserisciDati.done(function(data){
            console.log(data);
            alert("Dati inseriti correttamente");
            let _cambiaUtente=inviaRichiesta("post","server/cambiaUtente.php",{"id":1,"User":"Guest"});
            _cambiaUtente.done(function(){
                 window.location.href="index.html";
            });
        });
        _inserisciDati.fail(error);
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
