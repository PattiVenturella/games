
//Blake Lutz

var myGamePiece;
var wall;
var wall2;
var wall3;
var wall4;

//objects and player
function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, `gray`, 660, 620);
    wall = new component ( -600, 250, "red" , 1350 ,0)
    wall2 = new component ( 600, 250, "blue" , 0 ,0)
    wall3 = new component ( 20, -170, "green" , 630 ,650)
    wall4 = new component ( -650, -100, "yellow" , 1350 ,650)
   
}
//drawling
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1350;
        this.canvas.height = 650;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
//measurments and positions
function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        //colition detection
        
        
        //bottom right wall
        
        if(myGamePiece.y > 520 && myGamePiece.x > 670){
          console.log("Edge");
           myGamePiece = new component(30, 30, `gray`, myGamePiece.x - 20 ,myGamePiece.y - 20);
          updateGameArea(myGamePiece.speedY = 0)
           
        }
        
      
        if(myGamePiece.y > 450 && myGamePiece.x < 650){
          console.log("Edge");
           myGamePiece = new component(30, 30, `gray`, myGamePiece.x + 20 ,myGamePiece.y - 20);
          updateGameArea(myGamePiece.speedY = 0)
           
        }
      
        //top left wall
        
        //if(myGamePiece.y < 250 && myGamePiece.x < 600){
          //  console.log("Edge2");
          //  myGamePiece = new component(30, 30, `gray`, myGamePiece.x + 20 ,myGamePiece.y + 20 );
          //   updateGameArea(myGamePiece.speedY = 0)
      //  }
        //top right wall
        
      //  if(myGamePiece.x > 720 && myGamePiece.y < 250){
      //      console.log("Edge3");
      //        myGamePiece = new component(30, 30, `gray`, myGamePiece.x - 20,myGamePiece.y + 20);
      //        updateGameArea(myGamePiece.speedX = 0)
      //  }
      //  bottom left wall
      
      // if(myGamePiece.x < 600 && myGamePiece.y > 370){
      //      console.log("Edge4");
      //       myGamePiece = new component(30, 30, `gray`, myGamePiece.x + 20,myGamePiece.y - 20 );
      //      updateGameArea(myGamePiece.speedX = 0)
      //  }
      
      
        //loading areas
        
        //if (myGamePiece.y < 0){
        //         window.location.href = "area1.html"}

        //if (myGamePiece.x >1350){
        //        window.location.href = "area2.html"
        //}

        // if (myGamePiece.x < 0){
        //        window.location.href = "area3.html"
        //}

        if (myGamePiece.y > 650){
                 window.location.href = "game.html"}

    };
    //movement calculations
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}
//gamer area changes
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    //movement
    if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece.speedX = -10; }
    if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece.speedX = 10; }
    if (myGameArea.keys && myGameArea.keys[87]) {myGamePiece.speedY = -10; }
    if (myGameArea.keys && myGameArea.keys[83]) {myGamePiece.speedY = 10; }
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -10; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 10; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -10; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 10; }
    //player and wall positions
    wall.newPos()
    wall.update()
    wall2.newPos()
    wall2.update()
    wall3.newPos()
    wall3.update()
    wall4.newPos()
    wall4.update()
    myGamePiece.newPos();
    myGamePiece.update();
}
//resets character position
function reset() {
    myGamePiece = new component(30, 30, `gray`, 662, 305);


}