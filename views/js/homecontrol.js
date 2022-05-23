const advancedSearch = document.getElementById("advancedS")
const countrySearch = document.getElementById("countryS")

const advancedBtn = document.getElementById("advancedbtn")
const mapBtn = document.getElementById("mapbtn")
const countryBtn = document.getElementById("countrybtn")

run()

function run (){
    advancedBtn.addEventListener('click', ()=>{
        advancedSearch.style.cssText="transform: translateX(0); transition: 1s; opacity: 1";
        countrySearch.style.cssText="transform: translateX(-200vh); transition: 1s; opacity: 0";
        countryBtn.style.background="#4193C7";
        advancedBtn.style.background="white";
    })
    mapBtn.addEventListener('click', ()=>{
        console.log("map Btn clicked");
    })
    countryBtn.addEventListener('click', ()=>{
        advancedSearch.style.cssText="transform: translateX(-200vh); transition: 1s; opacity: 0";
        countrySearch.style.cssText="transform: translateX(0); transition: 1s; opacity: 1";
        advancedBtn.style.background="#4193C7";
        countryBtn.style.background="white";
        
    })
}

$('#advancedS').submit(function(){
    $("#list").html("")
    $.ajax({
      url: $('#advancedS').attr('action'),
      type: 'POST',
      data : $('#advancedS').serialize(),
      success: function(result){
          
              if(result.rows != undefined){
              
                for(let i = 0; i < result.rows.length; i++){
                    var temp = `
                        <div class="listOfFlights" id="listOfFlights">
                        <div class="dep_info space">
                        <img class="flightIcon" src="./images/onboard.png" alt="icon">
                        <h1 class="title-dep"> ${result.rows[i].f_departure_name}</h1>  
                        <p>${ result.rows[i].f_departure_date } |${result.rows[i].f_departure_time}</p>
                        </div>
                        
                        <div class="rout-icon space">
                        <img class="animatedIcon" src="./images/loader/loader (2).gif" alt="" width="200px">
                        </div>
                        
                        <div class="des_info space">
                        <img class="flightIcon" src="./images/landing.png" alt="icon">
                        <h1 class="title-des">${ result.rows[i].f_destination_name}</h1>  
                        <p>${result.rows[i].f_destination_date} |${ result.rows[i].f_destination_time }</p>
                       
                        <div class="btn-cont">
                            <h2>${result.rows[i].f_price} SEK</h2>
                            <button class="searchBtn" id="${result.rows[i].f_id}" onclick="seatWindowOpen()">Detailes</button>
                        </div>

                        </div>
                        </div>
                    `;
                    $("#list").append(temp);
                }
              }else{
                $("#list").html("no flights available")
              }
            
        console.log('form submitted.');
      }
    });
    return false;
});


$('#countryS').submit(function(){
    $("#list").html("")
    $.ajax({
      url: $('#countryS').attr('action'),
      type: 'POST',
      data : $('#countryS').serialize(),
      success: function(result){
          
              if(result.rows != undefined){
              
                for(let i = 0; i < result.rows.length; i++){
                    var temp = `
                    <div class="listOfFlights" id="listOfFlights">
                        <div class="dep_info space">
                            <img class="flightIcon" src="./images/onboard.png" alt="icon">
                            <h1 class="title-dep"> ${result.rows[i].f_departure_name}</h1>  
                            <p>${ result.rows[i].f_departure_date } |${result.rows[i].f_departure_time}</p>
                        </div>
                        
                        <div class="rout-icon space">
                            <img class="animatedIcon" src="./images/loader/loader (2).gif" alt="" width="200px">
                        </div>
                        
                        <div class="des_info space">
                            <img class="flightIcon" src="./images/landing.png" alt="icon">
                            <h1 class="title-des">${ result.rows[i].f_destination_name}</h1>  
                            <p>${result.rows[i].f_destination_date} |${ result.rows[i].f_destination_time }</p>
                            <div class="btn-cont">
                            <h2>${result.rows[i].f_price} SEK</h2>
                            <button class="searchBtn" id="${result.rows[i].f_id}" onclick="seatWindowOpen()">Detailes</button>
                            </div>
                        </div>
                    </div>
                    `;
                    $("#list").append(temp);
                }
              }else{
                $("#list").html("no flights available")
              }
            
        console.log('form submitted.');
      }
    });
    return false;
});








/*
    toggle seat window
*/


const seatWin = document.getElementById("seatWindow");
function seatWindowOpen(){
    seatWin.style.display = "flex";
}

function seatWindowClose(){
    seatWin.style.display = "none";
}









/*

    switch theme

*/


function switchThem(){
    var switchBtn = document.getElementById("username");
    var topBtn = document.getElementById("topBtn");
    // var logo = document.querySelector(".logo");
    var toggleSwitch = false;
    var logotext = document.querySelectorAll("#logotext");
    var inputName = document.querySelector(".content-name");
    var inputMsg = document.querySelector(".content-psd");
    
    switchBtn.addEventListener("click", ()=>{
        const atages = document.querySelectorAll("a");
        const labels = document.querySelectorAll("label");
        const p = document.querySelectorAll("p");
        if (toggleSwitch == false) {
            atages.forEach(e => e.style.color = "white")
            labels.forEach(e => e.style.color = "white")
            p.forEach(e => e.style.color = "white")
            document.body.style.background = "#112";
            advancedBtn.style.cssText = "background: #221E4E; color: white;";
            document.getElementById("advancedS").style.background = "#221E4E";    
            toggleSwitch = true
        }
        else if(toggleSwitch == true){
            atages.forEach(e => e.style.color = "#333")
            labels.forEach(e => e.style.color = "#333")
            p.forEach(e => e.style.color = "#333")
            advancedBtn.style.cssText = "background: white; color: #333;";
            document.body.style.background = "#eee";
            document.getElementById("advancedS").style.cssText = "background: white; color: #eee;";    
        toggleSwitch = false
          
      }
    })
  }
  
  switchThem();
  
  
