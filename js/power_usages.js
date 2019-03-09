'use strict'

/* Household appliances */

var ach, kettleh, stoveh, ovenh, televisionh, radioh, fridgeh, freezerh, chargerh, computerh, fanh;
var dailyDemand = 0.0;

function calculateHHdemand(){
    if(document.getElementById("ac").checked == true){
        ach = document.getElementById("acHrs").value;
        if(ach == 0){
            ach = 8;
        }
        dailyDemand = dailyDemand + ach * airConditioner;
    }
    if(document.getElementById("kettle").checked == true){
        kettleh = document.getElementById("kettleHrs").value;
        if(kettleh == 0){
            kettleh = 0.25;
        }
        dailyDemand = dailyDemand + kettleh * electricKettle;
    }
    if(document.getElementById("stove").checked == true){
        stoveh = document.getElementById("stoveHrs").value;
        if(stoveh == 0){
            stoveh = 1;
        }
        dailyDemand = dailyDemand + stoveh * stove;
    }
    if(document.getElementById("oven").checked == true){
        ovenh = document.getElementById("ovenHrs").value;
        if(ovenh == 0){
            ovenh = 1.75;
        }
        dailyDemand = dailyDemand + ovenh * oven;
    }
    if(document.getElementById("television").checked == true){
        televisionh = document.getElementById("televisionHrs").value;
        if(televisionh == 0){
            televisionh = 3;
        }
        dailyDemand = dailyDemand + televisionh * television;
    }
    if(document.getElementById("radio").checked == true){
        radioh = document.getElementById("radioHrs").value;
        if(radioh == 0){
            radioh = 24;
        }
        dailyDemand = dailyDemand + radioh * alarmClockRadio;
    }
    if(document.getElementById("fridge").checked == true){
        fridgeh = document.getElementById("fridgeHrs").value;
        if(fridgeh == 0){
            fridgeh = 24;
        }
        dailyDemand = dailyDemand + fridgeh * fridge;
    }
    if(document.getElementById("freezer").checked == true){
        freezerh = document.getElementById("freezerHrs").value;
        if(freezerh == 0){
            freezerh = 24;
        }
        dailyDemand = dailyDemand + freezerh * freezer;
    }
    if(document.getElementById("charger").checked == true){
        chargerh = document.getElementById("chargerHrs").value;
        if(chargerh == 0){
            chargerh = 4;
        }
        dailyDemand = dailyDemand + chargerh * phoneCharger;
    }
    if(document.getElementById("computer").checked == true){
        computerh = document.getElementById("computerHrs").value;
        if(computerh == 0){
            computerh = 2;
        }
        dailyDemand = dailyDemand + computerh * computer;
    }
    if(document.getElementById("fan").checked == true){
        fanh = document.getElementById("fanHrs").value;
        if(fanh == 0){
            fanh = 8;
        }
        dailyDemand = dailyDemand + fanh * tableFan;
    }
    //console.log(dailyDemand);
    document.getElementById("hh_kwh").value = Math.round(dailyDemand * 10) / 10;
    //console.log("hh_kwh : " + document.getElementById("hh_kwh").value);
    document.getElementById("hhValue").innerHTML = document.getElementById("hh_kwh").value;
    demand();
    drawTotalDemand(Math.round(dailyDemand * document.getElementById("households").value * 10) / 10);
    drawLoadProfile(load_profiles, Math.round(dailyDemand * document.getElementById("households").value * 10) / 10);
    //console.log(Math.round(dailyDemand * document.getElementById("households").value * 10) / 10);
    
    //Resets dailyDemand after everything has been set
    dailyDemand = 0.0;
}

/* Public utilities */
//public utilities variables


//calculates power usage estimation based on user's inputs.
function calcPublicDemand(){

}
