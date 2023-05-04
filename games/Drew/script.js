var score = 0;
var building = document.getElementById("job");
var dog = document.getElementById("dog");
var car = document.getElementById("car");
var game_over = document.getElementById("game_over");

var adding_score = false;
//start -----------------------------------------------------------------
var hiding = false;
document.getElementById("score").innerHTML = 0;
game_over.style.display = "none";
check();
//score -----------------------------------------------------------------
function add_score() {
    if(!adding_score && !hiding) {
        score += 100;
        adding_score = true;
    }
}
function check() {
    // console.log("is hiding_"+hiding);
    console.log("is adding_"+adding_score);
    setTimeout(check, 50);
}

//collision -----------------------------------------------------------------
var check_loss = setInterval(() => {
    var car_top = window.getComputedStyle(car).getPropertyValue("top");
    var building_left = window.getComputedStyle(building).getPropertyValue("left");
    var dog_left = window.getComputedStyle(dog).getPropertyValue("left");
    car_top = parseInt(car_top);
    building_left = parseInt(building_left);
    dog_left = parseInt(dog_left);
    
    const end_percent = 0.25;
    const percent = 0.32;
    const screen_width = window.innerWidth * percent;
    const edge = window.innerWidth * end_percent;

    if(building_left < screen_width && hiding == false) {
        add_score();
        document.getElementById("score").innerHTML = + score;
    }
    if(building_left < edge && hiding == false) {
        adding_score = true;
    } else {
        adding_score = false;
    }

    if(dog_left < screen_width && dog_left > edge && hiding == false) {
        game_over.style.display = "block";
        dog.style.display = "none";
        building.style.display = "none";
    }
}, 500);
//Random car -----------------------------------------------------------------
var random_car;
random_car = Math.floor(Math.random() * 5)+1;
console.log(random_car);
if(random_car == 1) {
    car.src = "img/travel/car.png";
} else if(random_car == 2) {
    car.src = "img/travel/truck.png";
} else if(random_car == 3) {
    car.src = "img/travel/sportscar.png";
} else if(random_car == 4) {
    car.src = "img/travel/bananacar.png";
} else if(random_car == 5) {
    car.src = "img/travel/hotdogcar.png";
}
//input -----------------------------------------------------------------
    document.addEventListener("keydown", event => {
        if(event.key === " " && hiding == false) {
            car.style.zIndex = "1";
            car.style.opacity = "25%";
            hiding = true;
        }    
    });
    document.addEventListener("keyup", event => {
        if(event.key === " " && hiding == true) {
            car.style.zIndex = "4";
            car.style.opacity = "100%";
            hiding = false;
        }    
    });
    document.addEventListener("keydown", event => {
        if(event.key == "Escape") {
            window.location = "index.html";
        }
    });
    document.addEventListener("keydown", event => {
        if(event.key === "r") {
            window.location = "game.html";
        }
    });