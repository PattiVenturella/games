//create escape menu
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

function start() {
            let numOne = Math.floor(Math.random()*100) + 1; //make it so that the 3 random numbers cannot be the same
            let numTwo = Math.floor(Math.random()*100) + 1;
            let numThree = Math.floor(Math.random()*100) +1;
            console.log(numOne);
            console.log(numTwo);
            console.log(numThree);
            let ctr = 0;
            let guess = 0;
            let total = numOne + numTwo + numThree;
            console.log(total);
        
            while(guess != total){
                ctr++;
                guess =  parseInt(prompt("Take your best guess."));
            
                    if(guess == 0 || guess == total){
                        break;
                    }
                    else if(guess > total){
                        alert("Your guess is too high");
                    }
                    else{
                        alert("Your guess is too low");
                    }
            }
            if(ctr == 1) {
                document.write("Amazing! You guessed the correct number in 1 try!") 
            } else if (ctr <= 10 && ctr > 1){
                document.write("Good job. You guessed the correct number in " + ctr + " tries");
            } else if (ctr > 10 && ctr < 15) {
                document.write("You guessed the correct number in " + ctr + " tries.");
            } else if (ctr >= 15) {
                document.write("You lost. It took you " + ctr + " tries to guess the correct number.")
            }
}

function goBack() {
    window.location.href = "index.html"
}

function rules() {
    alert("Pressing the start button will generate 3 random numbers between 1 and 100.\nThese 3 numbers will be added together and it is your job to correctly guess the total.\nIf it takes you 15 or more tries to guess the number correctly, you lose.")
}

function back() {
    var x = document.getElementById("menu");
    x.style.display = "none" 
}