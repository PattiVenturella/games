// <!-- DavisLy  4/27/23-->

//wordle but with numbers
function $(sel) {
    return document.querySelector(sel) //$=document.querySelector
}
//runs the animation for rules
var imgObj = null;
var animate; //add
var animateTwo; //add

function init() {
    imgObj = document.getElementById("myhome");
    imgObj.style.position = "relative";
    imgObj.style.left = "180px";

}
function moveRight() {
    imgObj.style.left = parseInt(imgObj.style.left) + 40 + "px";
    animate = setTimeout(moveRight, 500);//add moveRight in 1sec
    //after 4 sec or when hit 420px disapear
    if (parseInt(imgObj.style.left) >= 420) {
        clearTimeout(animate);
        toggle()
        window.location.href = "rule.html";
    }
    
}

//hide everything header
function toggle() {
    //let toggle = startButton => {
        let H_element = document.getElementById("myhome");
        let hidden = H_element.getAttribute("hidden");
        
        if (hidden) {
            H_element.removeAttribute("hidden");
            // button.innerText = "Hide home page";
        } else {
            H_element.setAttribute("hidden", "hidden");
            // button.innerText = "Show home";
        }
    }
    
  
bbb = []
function randomNum() {
    let b = "ranChoice";
    var ran = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let a = 0; a < 3; a++) {
        bb = ran[Math.floor(Math.random() * ran.length)];
        console.log('The computer chose: ' + bb);
        b = b + a;
        bbb[a] = bb
    }
    return bbb
}

let guessLEFT = "";
function startG() {
    toggle()
    boxes()
    randomNum()
    boxUNnum()
    document.getElementById('boxIG').value = '';
    document.getElementById('boxIIG').value = '';
    document.getElementById('boxIIIG').value = '';
    guessLEFT = document.getElementById('playerScore').innerHTML = 5;
    //allow enter to run submit
    document.addEventListener("keydown", (e) =>
    e.key === "Enter" && getData())
}

//window.onload = function() 
function boxes() {
    document.getElementsByClassName("hidden")[0].removeAttribute("class");
    document.getElementsByClassName("hidden")[0].removeAttribute("class");

}
//this the number they have to guess
function boxnum() {
    document.getElementById("boxI").innerHTML = bbb[0];
    document.getElementById("boxII").innerHTML = bbb[1];
    document.getElementById("boxIII").innerHTML = bbb[2];
}
function boxUNnum() {
    document.getElementById("boxI").innerHTML = "?";
    document.getElementById("boxII").innerHTML = "?";
    document.getElementById("boxIII").innerHTML = "?";
}

// checking the answer

function getData() {
    let gI = document.getElementById("boxIG").value;
    let gII = document.getElementById("boxIIG").value;
    let gIII = document.getElementById("boxIIIG").value;

    if (gI == bbb[0]) {
        document.getElementById("boxI").style.borderColor = "green";
        document.getElementById("boxI").innerHTML = bbb[0];
        document.getElementById("boxIG").setAttribute("disabled", "disabled")
        document.getElementById("boxIG").setAttribute("color", "green")

    } else if (gI < bbb[0]) {
        document.getElementById("boxI").style.borderColor = "blue";
    } else {
        document.getElementById("boxI").style.borderColor = "red";
    }
    if (gII == bbb[1]) {
        document.getElementById("boxII").style.borderColor = "green";
        document.getElementById("boxII").innerHTML = bbb[1];
        document.getElementById("boxIIG").setAttribute("disabled", "disabled")
        document.getElementById("boxIIG").setAttribute("color", "green")

    } else if (gII < bbb[1]) {
        document.getElementById("boxII").style.borderColor = "blue";
    } else {
        document.getElementById("boxII").style.borderColor = "red";
    }
    if (gIII == bbb[2]) {
        document.getElementById("boxIII").style.borderColor = "green";
        document.getElementById("boxIII").innerHTML = bbb[2];
        document.getElementById("boxIIIG").setAttribute("disabled", "disabled")
        document.getElementById("boxIIIG").setAttribute("color", "green")

    } else if (gIII < bbb[2]) {
        document.getElementById("boxIII").style.borderColor = "blue";
    } else {
        document.getElementById("boxIII").style.borderColor = "red";
    }
    //guess left  
    guessLEFT--;

    document.getElementById('playerScore').innerHTML = guessLEFT;
    if (gI == bbb[0] && gII == bbb[1] && gIII == bbb[2]) {
        // window.location.href = "finish.html"; 
        finish()
        win()
    } else if (guessLEFT < 0) {
        finish()
        lose()
    }

}
// finish js 
function finish() {
    document.getElementById("finish").style.display = 'none';
    finishP()
}
function finishP() {
    document.getElementsByClassName("finishP2")[0].removeAttribute("class"); 
    document.getElementById("FboxI").innerHTML = bbb[0];
    document.getElementById("FboxII").innerHTML = bbb[1];
    document.getElementById("FboxIII").innerHTML = bbb[2];
}

function lose(){
    document.getElementById("lose/win").innerHTML = "<h1>You lose<br>Try again <br><br>The answer are<br><br><br><br><br></h1>";
    

}
function win(){
    document.getElementById("lose/win").innerHTML = "<h1>You Win<br>Do you like to play agian <br><br><br><br><br><br><br></h1>";

}
function restart(){
    window.location.href = "index.html";
}