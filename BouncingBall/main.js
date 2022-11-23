function setup() {
    createCanvas(800, 400);
  }
  
  var arrCurve = [];
  var state = 0;
  var iter = 0;
  
  var wait = 0;
  var finishWait = 0;
  
  var curveVertical = 100;
  var highValue = 0;
  var currentAngle = -45
  
  
  function draw() {
    background(220);
    
    //Click 1  
    if(state > 0){
      noFill();
      bezier(120, 40, 320, 20, 320, 300, 330, 300);
      noFill();
      bezier(330, 300, 330, 94, 380, 58, 600, 40);    
    }
      
    //Click 2
    if(state > 1){
        arrCurve = concat(
          storyboard(120, 40, 320, 20, 320, 300, 330, 300),
          storyboard(330, 300, 330, 94, 380, 58, 600, 40)
        )
    
      storyboard(120, 40, 320, 20, 320, 300, 330, 300);
      storyboard(330, 300, 330, 94, 380, 58, 600, 40);
    }
  
    //Click 3
    if(state > 2){
      
      angle = currentAngle * (PI / 180)  //Convert Radians in angles
      
      
      if(finishWait >= wait){
        if(iter < arrCurve.length-1){
          if(highValue < arrCurve[iter][1]){ // When the ball is falling
              //Update the variable that helps us determine if the ball is                 falling
              highValue = arrCurve[iter][1]; 
              curveVertical-=5; //Update the "curvature" of the ellipse  
          } else { // After the ball bounced
            
            curveVertical+=5; //Update the "curvature" of the ellipse  
          }
          
          iter++; //Uptade "position point"
          currentAngle += 5 //Update the "rotation" of the ball
        } 
        
        
        // Draw the ball
        translate(arrCurve[iter][0], arrCurve[iter][1])
        rotate(angle)
        ellipse(0, 0, 100, curveVertical)      
        
        wait += 100; //Update the time to wait
      } else {
        
        // Draw the ball
        translate(arrCurve[iter][0], arrCurve[iter][1])
        rotate(angle)
        ellipse(0, 0, 100, curveVertical)
      }
        
      finishWait += second(); // Update next time to wait
    }
  }
  
  function storyboard(x1, y1, x2, y2, x3, y3, x4, y4){
    fill(255);
    steps = 10;
    arrPoint = [];
      for (var i = 0; i <= steps; i++) {
        var t = i / float(steps);
        var x = bezierPoint(x1, x2, x3, x4, t);
        var y = bezierPoint(y1, y2, y3, y4, t);
        ellipse(x, y, 10, 10);
        arrPoint.push([x,y]);
      }
    
    return arrPoint;
  }
  
  function mousePressed(){ state++; }
  
  