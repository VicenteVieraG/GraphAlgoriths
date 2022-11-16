function setup() {
    createCanvas(640, 480);
  }
  
  
  function myTranslate(x, y, tx, ty) {
    newX = x + tx;
    newY = y + ty;
    return [newX, newY];
  }
  
  
  function myRotation(x, y, angle, xc, yc) {
    angle = angle * (PI / 180)  
    newX = ((x-xc) * cos(angle)) - ((y-yc) * sin(angle)) + xc
    newY = ((x-xc) * sin(angle)) + ((y-yc) * cos(angle)) + yc
    return [newX, newY];
  }
  
  //Fix it
  function myRotatePiv(x, y, angle, pivX, pivY, xc, yc){
    angle = angle * (PI / 180)
    newX = pivX + (((x - pivX)) * cos(angle)) - ((y - pivY) * sin(angle))
      
    newY = pivY + ((x - pivX) * sin(angle)) + ((y - pivY) * cos(angle))
    return [newX, newY];
  }
  
  
  function myScaling(x, y, sx, sy, xc, yc) { 
     center = [width/2, height/2];
    matrixA = [[sx, 0], [0, sy]];
    matrixB = [[x - center[0]], [y - center[1]]];
    matrixC = [[center[0]], [center[1]]];
    matrixD = [[0], [0]];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        matrixD[i][0] += matrixA[i][j] * matrixB[j][0];
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 1; j++) {
        matrixD[i][j] += matrixC[i][j];
      }
    }
    
    newx = matrixD[0][0];
    newy = matrixD[1][0];
    
    return [newx, newy]; 
  }
  
  function myReflection(x, y) {
    return [x, y];
  }
  
  function myShearX(x, y) {
    return [x, y];
  }
  
  function myShearY(x, y) {
    return [x, y];
  }
  
  function draw() {
    background(102);
    fill(255);
    polygon(width/2, height/2, 50, 6, null);
    fill(1);
    polygon(width/2, height/2, 50, 6, myTranslate, 50, 50);
    fill(255, 1, 1);
    polygon(width/2, height/2, 50, 6, myRotation, 25, width/2, height/2);
    fill(1, 1, 255);
    polygon(width/2, height/2, 50, 6, myRotatePiv, 25, 50, 50, width/2, height/2);
    fill(1,255,1);
    polygon(width/2, height/2, 50, 6, myScaling, .5, .5, width/2, height/2);
  }
  
  function polygon(x, y, radius, npoints, transform, ...params) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      if (transform != null) {
        [sx, sy] = transform(sx,sy, ...params);
      }
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }