/* old java
================================================================================================================
gsap.set(".ball", {xPercent: -50, yPercent: -50});

const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.4;

const xSet = gsap.quickSetter(sport.jpg, "x", "px");
const ySet = gsap.quickSetter(sport.jpg, "y", "px");

window.addEventListener("mousedown", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});

gsap.ticker.add(() => {
  
  // adjust speed for higher refresh monitors
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
  
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});
window.onload = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("img/sport.jpg");
    //ctx.drawImage(img, 10, 10);
  }
==================================================================================================================  */
import {bytesManager, bytesCheck, upgradeManager, priceManager, clearData} from "../javascript/data-config.js";

let hackButton = document.getElementById("clicker");

hackButton.addEventListener("click", function(){
    bytesManager("add", upgradeManager("level", "check", 2)+1);
});

document.getElementById("format-clear").addEventListener("click", function(){
    clearData();
    alert("Cleared Data!");
});

export function cacheLoop(){
    setTimeout(() => {
        bytesManager("add", upgradeManager("data", "check", 1));
        console.log(upgradeManager("data", "check", 0), upgradeManager("data", "check", 1), upgradeManager("data", "check", 2))
        cacheLoop();
    }, (upgradeManager("data", "check", 0) * 1000));
};

document.addEventListener('click', function(event) {
    let clickTarget = event.target;
    let bytes = bytesCheck('bytes');

	if (clickTarget.matches('.grid-item') && !clickTarget.matches('.disabled')) {
        let arrayIndex;
        if(clickTarget == document.getElementById('loops')){                     
            arrayIndex = 0;
        }else if(clickTarget == document.getElementById('ifStatement')){
            arrayIndex = 1;
        }else if(clickTarget == document.getElementById('monkey')){
            arrayIndex = 2;
        }else{
            alert("You somehow clicked an upgrade that doesn't exist");
            return;
        };
        
        
        let price = upgradeManager("price", "check", arrayIndex)
        if(bytes < price){ // Simple bytes check to see if you have enough to buy the upgrade.
            alert("Not enough money");
            return;
        };
        upgradeManager("level", "add", arrayIndex);
        
        
        if(upgradeManager("level", "check", 0) >= 1 && clickTarget == document.getElementById('loops') ){ // Check if loops has been bought, if so then remove disabled and start the loop.
            if(document.getElementById("ifStatement").classList.contains("disabled")){
                document.getElementById("ifStatement").classList.remove("disabled");
                document.getElementById("stats-rate").classList.remove("disabled");
                document.getElementById("stats-amount").classList.remove("disabled");
                console.log("Loop Started");
                cacheLoop();
            }else if(!document.getElementById("ifStatement").classList.contains("disabled")){
                let changeTo = parseFloat((upgradeManager("data", "check", 0) - 0.1).toFixed(1));
                if(changeTo < 1){
                    changeTo = 1;
                    clickTarget.classList.add("disabled")
                };
                upgradeManager("data", "change", 0, changeTo);
                document.getElementById("rate-num").innerHTML = changeTo;
            };
        };

        if(upgradeManager("level", "check", 1) >= 1 && clickTarget == document.getElementById('ifStatement') ){
            upgradeManager("data", "add", 1);
            document.getElementById("amount-num").innerHTML = upgradeManager("data", "check", 1);
        };

        
        
        bytesManager("sub", price); // Money removal is down here so if a nonfunctional upgrade is clicked somehow money isn't taken.
        priceManager(0.1, arrayIndex, clickTarget.getElementsByClassName('price')[0]);
	};

});