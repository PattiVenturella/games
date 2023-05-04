// const toggle = document.querySelector(".toggle");
// const menu = document.querySelector(".menu");
// const items = document.querySelectorAll(".item");

let canvas = document.getElementById("myCanvas"); // Import Canvas
console.log(canvas)
var ctx = canvas.getContext("2d"); // Context of canvas
var ballRadius = 10; // Define ball radius
var x = canvas.width - Math.floor(Math.random() * 600) // Define width of canvas
var y = canvas.height - 30; // Define height of Canvas
var dx = 6; // Speed of ball width
var dy = -6; // Speed of ball vertically
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 12;
var brickColumnCount = 5;
var brickWidth = 72;
var brickHeight = 20;
var brickPadding = 6;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var background = new Image();
// background.src = "https://1.bp.blogspot.com/-hs2fckXJBkE/W5obuBm9kII/AAAAAAAAB38/C89KFBJCIlEwfl-g8d-T1Cu4cHFWjYI2QCLcBGAs/s1600/breakoutbg.png";
var play = new Image();
//play.src = "https://1.bp.blogspot.com/-fVAKH-3TLuo/W5onDDHje0I/AAAAAAAAB4I/q2ooE6GuzQkS80dtw1JILXjFWdfQ3IKkwCLcBGAs/s1600/breaoutplay.png";

var startBtn = document.getElementById('startBtn');

    //game
    function drawCanvas() {
      ctx.beginPath();
      ctx.drawImage(background, 0, 0);
      ctx.fill();
      ctx.closePath();

    }

    function drawPlay() {
      ctx.beginPath();
      ctx.drawImage(play, 250, 250);
      ctx.fill();
      // clickable;
      ctx.closePath();

    }

    function newBrick() {
      return {
        x: 0,
        y: 0,
        status: 1
      };

    }

    var bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c].unshift(newBrick());
      }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, true)
   

    function keyDownHandler(e) {
      if (e.keyCode == 39) {
        rightPressed = true;
      } else if (e.keyCode == 37) {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.keyCode == 39) {
        rightPressed = false;
      } else if (e.keyCode == 37) {
        leftPressed = false;
      }
    }

    function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

    function collisionDetection() {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          var b = bricks[c][r];
          if (b.status == 1) {
            if (x > b.x && x < b.x + brickWidth + ballRadius && y > b.y && y < b.y + brickHeight + ballRadius) {
              dy = -dy;
              b.status = 0;
              score++;
              if (score == 9999) {
                alert("YOU WIN, CONGRATS!");
                document.location.reload();
              }
            }
          }
        }
      }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFF00";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.closePath();
    }

    function moreBricks() {
      bricks.unshift([]);
      newBrick();
      brickColumnCount++;
      for (r = 0; r < brickRowCount; r++) {
        bricks[0].unshift(newBrick());
      }
    }

    function drawBricks() {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status == 1) {
            var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#5fdb9d";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#5fdb9d";
      ctx.fillText("Score: " + score, 8, 20);
    }

    function drawLives() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#5fdb9d";
      ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    var frameCount = 0;
    const FRAME_COUNT_NEW_LINE = 500;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      startBtn.style.display = 'none';

      frameCount += 1.5; // Changes time it takes for bricks to spawn
      if (frameCount === FRAME_COUNT_NEW_LINE) {
        frameCount = 0;
        moreBricks();
      }

      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          lives--;
          if (!lives) {

            document.location.reload();
          } else {
            x = canvas.width - Math.floor(Math.random() * 600);
            y = canvas.height - 30;
            dx = 6;
            dy = -6;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -=7;
      }

      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }
    drawCanvas();
    drawPlay();

        /* Toggle mobile menu */
        // function toggleMenu() {
        // if (menu.classList.contains("active")) {
        //     menu.classList.remove("active");
        //     toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
        // } else {
        //     menu.classList.add("active");
        //     toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
        // }
        // }

        /* Activate Submenu */
        function toggleItem() {
        if (this.classList.contains("submenu-active")) {
            this.classList.remove("submenu-active");
        } else if (menu.querySelector(".submenu-active")) {
            menu.querySelector(".submenu-active").classList.remove("submenu-active");
            this.classList.add("submenu-active");
        } else {
            this.classList.add("submenu-active");
        }
        }

        /* Close Submenu From Anywhere */
        function closeSubmenu(e) {
        if (menu.querySelector(".submenu-active")) {
            let isClickInside = menu
            .querySelector(".submenu-active")
            .contains(e.target);

            if (!isClickInside && menu.querySelector(".submenu-active")) {
            menu.querySelector(".submenu-active").classList.remove("submenu-active");
            }
        }
        }
        /* Event Listeners */
        // toggle.addEventListener("click", toggleMenu, false);
        // for (let item of items) {
        // if (item.querySelector(".submenu")) {
        //     item.addEventListener("click", toggleItem, false);
        // }
        // item.addEventListener("keypress", toggleItem, false);
        // }
        // document.addEventListener("click", closeSubmenu, false);