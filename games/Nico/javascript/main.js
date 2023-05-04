let text="";
ctr=1
let dice1;
let dice2;
dice1 =  Math.floor((Math.random() * 6) + 1); //generates random number 1-6
dice2 = Math.floor((Math.random() * 6) + 1);
compRoll = dice1+dice2; //adds 2 dice together (2-12)
function roll(){
    const user_guess = parseInt(document.querySelector("#guess").value);
  
  
    /*outcomes for number entered*/
    if(user_guess<=1){
        alert("READ THE RULES!!!!");
    }

    else if(user_guess >12){
        alert("READ THE RULES!!!!");
    }
    else if(user_guess != compRoll){
        text += "Your guess was not right try again <br>";
        ctr++
    }

    else if(user_guess == compRoll){

        text+= "HOORRAAYY! you won in " +ctr + " try(s)<br>";
        
    }
    if (ctr==1 && user_guess == compRoll){
        /*creates image tag and puts it into element*/
        img = "<img src='stress-free-birthdays.jpg' alt='party'>";
        document.getElementById("party").innerHTML = img
        
    }

    if(ctr==12){ /*max 12 guesses*/
        alert("SORRY! YOU LOST!");
        window.open("game.html");
        window.close();
    }
   
    document.getElementById("result").innerHTML = text;
    
}

//creates escape menu
addEventListener("keydown", function(event) {
    if (event.code=="Escape") {
        hideMenu()
    }
})
//make menu appear/disappear when escape is pressed
function hideMenu() {
    var x = document.getElementById("menu");
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function play(){/*all opens new pages and closes previous*/
    window.open('game.html');
    window.close();
}

function goBack(){
    window.open('mainpage.html');
    window.close();
}

function rules(){
    window.open('rules.html');
    window.close();
}

function exit(){ /*asks if you really want to quit*/
    let text = "Are you sure you want to quit?";
  if (confirm(text) == true) {
    window.close();
  }
}