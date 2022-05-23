
function fetch(){
    const departureName = document.getElementById("depInput").value;
    console.log(departureName + " choice")
    if(departureName != ""){
        
        $.ajax({
            url: "/api",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({choice: departureName}),
            success: function(result){
                console.log("got something")
                console.log(result.JSON)

            }
            
        })
    }
}