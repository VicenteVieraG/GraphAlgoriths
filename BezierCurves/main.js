var it;
var P;
var R;

function setup() {
  createCanvas(600, 600);
  //Create the array and initialize it to 0's
  P = [8];
  for(let i=0;i<8;i++)P[i] = 0;
  //Initialize iterator
  it = 0;
  //Define the radius for dragging the control points
  R = 20;
}

function draw(){
  background(225,225,225);
  
  //Create the first line
  if(P[3]===0 && P[0]!=0){
    line(P[0],P[1],mouseX,mouseY);
  }else if(P[3]!=0 && P[7]===0){
    line(P[0],P[1],P[2],P[3])
  }
  
  //create the visual control points
  if(P[5]!=0)circle(P[4],P[5],10);
  if(P[7]!=0)circle(P[6],P[7],10);
  
  //means we have the control points
  if(P[7]!=0)bezier(P[0],P[1],P[4],P[5],P[6],P[7],P[2],P[3]);
}

//Getting the points for the array
function mouseClicked(){
  if(P[7]===0){
    P[it] = mouseX;
    P[it+1] = mouseY;
    it+=2;
  }
}

//Drag the poitns
function mouseDragged(){
  //Check if the mouse is in the points radius and change position
  if(mouseX <= (P[4]+R) && mouseY <= (P[5]+R)){
    P[4] = mouseX;
    P[5] = mouseY;
  }else if(mouseX <= (P[6]+R) && mouseY <= (P[7]+R)){
    P[6] = mouseX;
    P[7] = mouseY;
  }
}