"use strict";

$(function () {	
    let _wrapper=$("#wrapper");
	let _divTitolo = $("#divTitolo");
    let _divSongs = $("#songs");
    let _richiestaCanzoni = inviaRichiesta("get", "server/elencoCanzoni.php");
    let Guest="no";
	
	_richiestaCanzoni.fail(function(jqXHR, test_status, str_error) {
		if (jqXHR.status == 403) {  
			window.location.href="login.html";
		} 
		else
			error(jqXHR, test_status, str_error)
	});
	
	_richiestaCanzoni.done(function (data) {
            let _salvaId=inviaRichiesta("get", "server/salvaId.php",{"id":1});
    _salvaId.done(function(ris){
        console.log(ris);
        Guest=ris['ris'];
    });
		console.log(data)
		_wrapper.show();
        creaButtons(data);
        
            
    function creaButtons(data)
    {
        for(let i=0;i<data.data.length;i++)
        {
            let text;
            if(data.data[i]['feat']=="")
                text=data.data[i]['nome'];  
            else
                text=data.data[i]['nome']+" (feat."+data.data[i]['feat']+")";
            $("<div>", {
			"class": "btn btn-primary",
			"text": text,
            "css":{"margin":"0.4%"}
		}).appendTo(_divSongs);
            if(Guest=="no")
            {
                $("<div>", {
                     "id":data.data[i]['nome'],
			         "class": "delete",
			         "text": "X"
		          }).appendTo(_divSongs).on("click",function(){
                delete(this);
                });     
            }
 
        }
        if(Guest=="no")
        {
            $("<div>", {
			     "css": {"backround-color":"green","color":"white"},
			     "text": "Browse"
		      }).appendTo(_divSongs).on("click",function(){
                let _salvaId=inviaRichiesta("get", "server/salvaId.php",{"id":1});
                window.location.href="index.html";
                }); 
        }
    }
        
        
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
