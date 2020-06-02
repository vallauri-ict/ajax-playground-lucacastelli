"use strict";

$(function () {
	let _wrapper=$("#wrapper");
	let _divTitolo = $("#divTitolo");
    let _divSongs = $("#songs")
	_wrapper.hide();
    
	let _richiestaCanzoni = inviaRichiesta("get", "server/elencoCanzoni.php");
    let _richiestaTotCanzoni;
	
	_richiestaCanzoni.fail(function(jqXHR, test_status, str_error) {
		if (jqXHR.status == 403) {  
			window.location.href="login.html";
		} 
		else
			error(jqXHR, test_status, str_error)
	});
	
	_richiestaCanzoni.done(function (data) {
        if(data.name=="Guest")
        {
            _richiestaTotCanzoni = inviaRichiesta("get", "server/elencoTotCanzoni.php");
            _richiestaTotCanzoni.done(function (data) {
            
		console.log(data)
		_wrapper.show();
        creaButtonsArtisti(data);
		
		let _p = $("<p>", {
				"css": {"text-align":"right"},
				"html" : "Benvenuto <b>" + data.name + "</b>"
			}).appendTo(_divTitolo);
                
        });
            
            return;
        }
        else
        {
            window.location.href="songs.html"; 
        }

        
        
    });
    function creaButtonsArtisti(data)
    {
        let i;
        for(i=0;i<data.data.length;i++)
        {
            
            let user=data.data[i]['username'].split(' ');
            if(user.length>1)
                user[0]=user[0]+user[1];
            
            if(user[0]!="Guest")
            $("<div>", {
            "id":(i),
			"class": "Artisti",
			"text": data.data[i]['username'],
            "css":{"background-image":"url(img/"+user[0]+".jpg)"}
		      }).appendTo(_divSongs).on("click",function(){
                salva(this);
                });
            else
                $("<div>", {
			 "text": "Inserisci la tua musica",
             "css":{"background-color":"green","color":"white","width":"100%","font-size":"1.5em","text-align":"center","height":"10%","font-weight":"bold"}
                }).appendTo(_divSongs).on("click",function(){
                    window.location.href="inserisci.html";
                });
        }
    }
    

function salva(sender)
{           
    let id=parseInt(sender.getAttribute("id"))+1;
    let _salvaId=inviaRichiesta("get", "server/salvaId.php",{"id":id});
    _salvaId.done(function(){
    window.location.href="songs.html"; 
    });
}
	
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
