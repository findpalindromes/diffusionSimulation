var diffusionRed = false; 
var diffusionBlue = false;
var numberOfTimesClickedR = 0;
var timesClickedR= 0;
var numberOfTimesClickedB = 0;
var timesClickedB= 0;
var redBallList = [];
var redBallsLeftList = [];
var redBallsRightList = [];
var blueBallList = [];
var blueBallsLeftList = [];
var blueBallsRightList = [];
var totalBallsList = [];
var blueSpeed = 1;
var redSpeed = 1;
var redSpeedX;
var redSpeedY;
var blueSpeed = 1;
var blueSpeedX;
var blueSpeedY;
var addedIValue;
var moving = false;


var checkCollisions = function(b1, b2){
    var distanceX = abs(b1.xPos - b2.xPos);
    var distanceY = abs(b1.yPos - b2.yPos);
    var newB1SpeedX = b1.speedX; 
    var newB2SpeedX = b2.speedX;
    var newB1SpeedY = b1.speedY;
    var newB2SpeedY = b2.speedY;
    
    if(distanceX < b1.width/2.5 + b2.width/2.5 && distanceY < b1.height/2.5 + b2.height/2.5){
      b1.speedX = newB2SpeedX;
      b2.speedX = newB1SpeedX; 
      b1.speedY = newB2SpeedY;
      b2.speedY = newB1SpeedY; 
      
      
    } 
};

var RedBall = function(x, y){
    this.xPos = x;
    this.yPos = y;
    this.width = 20;
    this.height = 20;
    this.move = false;
    this.timer = 200;
    
    this.chooseDirection = function(){
        this.angle = random(0,360);
    };
    
    this.chooseSpeed = function(){
        this.speedX = redSpeed*cos(this.angle);
        this.speedY = redSpeed*sin(this.angle);
        redSpeedX = this.speedX;
        redSpeedY = this.speedY;
    };
    
    
    this.updateTimer = function(){
        this.timer -=1.7; 
        if(this.timer <=0){
            this.move = false;
            moving = false;
            this.timer = 200;
        }
    };

    this.drawBall = function(){
        fill(255, 0, 0);
        noStroke();
        ellipse(this.xPos, this.yPos, this.width, this.height);
    };
    
    this.moveBall = function(){
        
    if(this.move){
        this.xPos +=this.speedX;
        this.yPos +=this.speedY;
        if(this.xPos >= width - this.width/2 || this.xPos <= this.width/2){
            this.speedX = this.speedX*-1;
        }
        
        if(this.yPos <= this.width/2 || this.yPos>= height - this.width/2){
            this.speedY = this.speedY*-1;
        }
        
    }
        
        //if diffusion button is not pressed, limit x boundary to line
        if(diffusionRed === false){
            if(this.xPos <= width/2 - this.width/2){
                if(this.xPos >= width/2 - this.width/2){
                    this.speedX = this.speedX*-1;
                }  
            }else{
                // combineLists();
                // collideWithAll();
                if(this.xPos <= width/2 + this.width/2){
                    this.speedX = this.speedX*-1;
                }
            }
        }
        
    };
    
    this.countBalls = function(){
        if(this.xPos >= width/2){
            for(var i = 0; i<redBallsLeftList.length; i++){
                if(this.xPos === redBallsLeftList[i].xPos){
                    redBallsRightList.push(redBallsLeftList[i]);
                    redBallsLeftList.splice(i,1);
                    
                }
            }
        }
        
        if(this.xPos <=width/2){
            for(var i = 0; i<redBallsRightList.length; i++){
                if(this.xPos === redBallsRightList[i].xPos){
                    redBallsLeftList.push(redBallsRightList[i]);
                    redBallsRightList.splice(i,1);
                }
            }
        }
    };
};

var BlueBall = function(x, y){
    this.xPos = x;
    this.yPos = y;
    this.width = 30;
    this.height = 30;
    this.move = false;
    this.timer = 200;
    
    this.chooseDirection = function(){
        this.angle = random(-360,360);
    };
    
    this.chooseSpeed = function(){
        this.speedX = blueSpeed*cos(this.angle);
        this.speedY = blueSpeed*sin(this.angle);
        blueSpeedX = this.speedX;
        blueSpeedY = this.speedY;
    };
    
    
    this.updateTimer = function(){
        this.timer -=1.7; 
        if(this.timer <=0){
            this.move = false;
            moving = false;
            this.timer = 200;
        }
    };

    this.drawBall = function(){
        fill(32, 62, 179);
        noStroke();
        ellipse(this.xPos, this.yPos, this.width, this.height);
    };
    
    this.moveBall = function(){
        
     if(this.move){
        this.xPos +=this.speedX;
        this.yPos +=this.speedY;
        if(this.xPos >= width - this.width/2 || this.xPos <= this.width/2){
            this.speedX = this.speedX*-1;
        }
        
        if(this.yPos <= this.width/2 || this.yPos>= height - this.width/2){
            this.speedY = this.speedY*-1;
        }
        
    }
        
        //if diffusion button is not pressed, limit x boundary to line
        if(diffusionBlue === false){
           if(this.xPos <= width/2 - this.width/2){
                if(this.xPos >= width/2 - this.width/2){
                    this.speedX = this.speedX*-1;
                }  
            }else{
                // combineLists();
                // collideWithAll();
                if(this.xPos <= width/2 + this.width/2){
                    this.speedX = this.speedX*-1;
                }
            }
        }
        
    };
    
    this.countBalls = function(){
        if(this.xPos <= width/2){
            for(var i = 0; i<blueBallsRightList.length; i++){
                if(this.xPos === blueBallsRightList[i].xPos){
                    blueBallsLeftList.push(blueBallsRightList[i]);
                    blueBallsRightList.splice(i,1);
                    
                }
            }
        }
        
        if(this.xPos >=width/2){
            for(var i = 0; i<blueBallsLeftList.length; i++){
                if(this.xPos === blueBallsLeftList[i].xPos){
                    blueBallsRightList.push(blueBallsLeftList[i]);
                    blueBallsLeftList.splice(i,1);
                }
            }
        }
    };
};

var addBallsButton = function(){
    //draws add red ball button
    fill(255, 255, 255);
    stroke(0, 0, 0);
    rect(100, height-50, 75,40);
    fill(0, 0, 0);
    textSize(12);
    text("Add 5 Balls", 108, height - 33);
    text("(Red)", 123, height - 18);
    
    //draws add blue ball button
    fill(255, 255, 255);
    rect(width-197, height-50, 75,40);
    fill(0, 0, 0);
    textSize(12);
    text("Add 5 Balls", width-188, height - 33);
    text("(Blue)", width-171, height - 18);
};

var speedButton = function(){
    //draws red speed button(UP)
    fill(255, 255, 255);
    rect(193, height-50, 34,40);
    fill(255, 0, 0);
    noStroke();
    triangle(210, height - 45, 200, height - 30, 220, height - 30);
    rect(205, height - 31, 10, 20);
   
    
    //draws red speed button(DOWN)
    fill(255, 255, 255);
    stroke(0, 0, 0);
    rect(240, height-50, 34,40);
    fill(255, 0, 0);
    noStroke();
    triangle(257, height-10, 247, height - 25, 267, height - 25);
    rect(252, height - 45, 10, 20);
    
    //draws blue speed button(UP)
    fill(255, 255, 255);
    stroke(0, 0, 0);
    rect(497, height-50, 34,40);
    fill(32, 62, 179);
    noStroke();
    triangle(515, height - 45, 505, height - 30, 525, height - 30);
    rect(510, height - 31, 10, 20);
    
    //draws blue speed button(DOWN)
    fill(255, 255, 255);
    stroke(0, 0, 0);
    rect(545, height-50, 34,40);
    fill(32, 62, 179);
    noStroke();
    triangle(562, height-10, 552, height - 25, 572, height - 25);
    rect(557, height - 45, 10, 20);
};


var diffusionButtonR = function(){
    if(diffusionRed){
        fill(57, 133, 57);
    }else{
        fill(255, 255, 255);
    }
    stroke(0, 0, 0);
    rect(10, height-50, 75,40);
    fill(0, 0, 0);
    textSize(14);
    text("Diffuse", 25, height - 33);
    text("(Red)", 30, height - 18);
    
};

var diffusionButtonB = function(){
    if(diffusionBlue){
        fill(57, 133, 57);
    }else{
        fill(255, 255, 255);
    }
    stroke(0, 0, 0);
    rect(312, height-50, 75,40);
    fill(0, 0, 0);
    textSize(14);
    text("Diffuse", 330, height - 33);
    text("(Blue)", 333, height - 18);
};

 var initialXR;
 var initialYR;
 
var makeRedBalls = function(){
    
    redBallList = [];
    redBallsLeftList = [];
    
        
    //draws red balls
    for(var i = 0; i< timesClickedR*5; i++){
        // var distanceX = abs(redBallList[i].xPos - redBallList[i+1].xPos);
        // var distanceY = abs(redBallList[i].yPos - redBallList[i+1].yPos);
         
        // while(distanceX <= redBallList[i-1].width/2.5 +redBallList[i].width/2.5  && distanceY <= redBallList[i-1].height/2.5 + redBallList[i].height/2.5){
            initialXR = random(50, width/2-50);
            initialYR = random(50, height-50);
        // }
        
        // var varName = "ballR" + i;
        var varName = new RedBall(initialXR, initialYR);
        redBallList.push(varName);
    }
    
    //duplicates total red ball list in redBallsLeftList(where red balls start)
    for(var i = 0; i<redBallList.length; i++){
            redBallsLeftList.push(redBallList[i]);
        }
        
};

var makeBlueBalls = function(){
    
    blueBallList = [];
    blueBallsRightList = []; 
    // totalBallsList = [];
        
    //draws blue balls
    for(var i=0; i<timesClickedB*5; i++){
        var initialXB = random(width/2+50, width-50);
        var initialYB = random(50, height-50);
        // var varName = "ballB" + i;
        var varName = new BlueBall(initialXB, initialYB);
        blueBallList.push(varName);
    }
    
    //duplicates total blue ball list in blueBallsRightList (where blue balls start)
    for(var i = 0; i< blueBallList.length; i++){
        blueBallsRightList.push(blueBallList[i]);
    }
    
    
};


mouseClicked = function(){
    //if redDiffuse button is clicked
    if(mouseX >= 10 && mouseX <= 85 && mouseY >= height - 50 && mouseY <= height - 10){
        numberOfTimesClickedR ++;
        if(numberOfTimesClickedR%2 !== 0){
            diffusionRed = true;
        }else{
            diffusionRed = false;
        }
    }
    
    //if blueDiffuse button is clicked
    if(mouseX >= 312 && mouseX <= 312+75 && mouseY >= height - 50 && mouseY <= height - 10){
        numberOfTimesClickedB ++;
        if(numberOfTimesClickedB%2 !== 0){
            diffusionBlue = true;
        }else{
            diffusionBlue = false;
        }
    }
    
    //if add red balls button is clicked
    if(mouseX >= 100 && mouseX <= 175 && mouseY >= height - 50 && mouseY <= height - 10){
        timesClickedR += 1;
        makeRedBalls();
        
    }
    
    //if add blue balls blutton is clicked
    if(mouseX >= width - 197 && mouseX <= width-197+75 && mouseY >= height - 50 && mouseY <= height - 10){
        timesClickedB +=1;
        makeBlueBalls();
    }
    
    //if red up arrow is clicked
    if(mouseX >= 193 && mouseX <= 193+34 && mouseY >= height - 50 && mouseY <= height - 10){
        redSpeed +=1;
    }
    //if red down arrow is clicked
    if(mouseX  >= 240 && mouseX <= 240+34 && mouseY >= height - 50 && mouseY <= height - 10){
        redSpeed -=1;
    }
    //if blue up arrow is clicked
    if(mouseX >= 497 && mouseX <= 497+34 && mouseY >= height - 50 && mouseY <= height - 10){
        blueSpeed +=1;
    }
    //if blue down arrow is clicked
    if(mouseX >= 545 && mouseX <= 545+34 && mouseY >= height - 50 && mouseY <= height - 10){
        blueSpeed -=1;
    }
};
   
keyPressed = function(){
    //if spacebar is pressed, move balls
    if(keyCode === 32){
        for(var i =0; i<redBallList.length; i++){
            redBallList[i].chooseDirection();
            redBallList[i].chooseSpeed();
            redBallList[i].move = true;
            moving = true;
        }
        
        for(var i =0; i<blueBallList.length; i++){
            blueBallList[i].chooseDirection();
            blueBallList[i].chooseSpeed();
            blueBallList[i].move = true;
            moving = true;
        }


    }
    
};
     

draw = function() {
    background(255, 255, 255);
    stroke(0, 0, 0);
    line(width/2, 0, width/2, height);
    addBallsButton();
    diffusionButtonR();
    diffusionButtonB();
    speedButton();
     
    for(var i=0; i<redBallList.length; i++){
        redBallList[i].drawBall();
        redBallList[i].moveBall(); 
        if(redBallList[i].move){
            for(var a = 0; a<redBallList.length-1; a++){
                checkCollisions(redBallList[i], redBallList[a+1]);
            } 
            for(var a=0; a<blueBallList.length; a++){
                checkCollisions(redBallList[i], blueBallList[a]);
            }
           redBallList[i].updateTimer();
        }
        redBallList[i].countBalls();
    }
   
    for(var i=0; i<blueBallList.length; i++){
        blueBallList[i].drawBall();
        blueBallList[i].moveBall();
        if(blueBallList[i].move){
            for(var a = 0; a<blueBallList.length-1; a++){
                checkCollisions(blueBallList[i], blueBallList[a+1]);
            } 
            blueBallList[i].updateTimer();
        }
        blueBallList[i].countBalls();
    }
    
    
    
    
       


    
    textSize(12); 
    fill(0, 0, 0);
    text("Total Number of Red Balls: " + (redBallList.length), 10, 20); 
    fill(255, 0, 0);
    text("Red Balls: " + redBallsLeftList.length, 10, 40);
    text("Red Balls: " + redBallsRightList.length, width -86, 40);
    text("Red Speed: " + redSpeed, 116, 40);
     fill(32, 62, 179);
    text("Blue Speed: " + blueSpeed, 116, 60);
    
    fill(0, 0, 0);
    text("Total Number of Blue Balls: " + (blueBallList.length), width-176, 20);
    fill(32, 62, 179);
    text("Blue Balls: " + blueBallsLeftList.length, 10, 60);
    text("Blue Balls: " + blueBallsRightList.length, width - 88, 60);
};
