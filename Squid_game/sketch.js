let video;
let poseNet;
let eyerX = 0;
let eyerY = 0;
let eyelX = 0;
let eyelY = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    let erX = poses[0].pose.keypoints[2].position.x;
    let erY = poses[0].pose.keypoints[2].position.y;
    let elX = poses[0].pose.keypoints[1].position.x;
    let elY = poses[0].pose.keypoints[1].position.y;
    eyerX = lerp(eyerX, erX, 0.5);
    eyerY = lerp(eyerY, erY, 0.5);
    eyelX = lerp(eyelX, elX, 0.5);
    eyelY = lerp(eyelY, elY, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
noStroke();
  if ((eyerX > 200) && (eyerX < 440) &&
    (eyerY > 120) && (eyerY < 360)) {
    fill("red");
  } else if ((eyelX > 200) && (eyelX < 440) &&
    (eyelX > 120) && (eyelY < 360)) {
    fill("red");
  } else {
    fill("green");
  }

  beginShape();
  vertex(0,0);
  vertex(640,0);
  vertex(640,480);
  vertex(0,480);
  
  beginContour();
  vertex(200,360);
  vertex(440,360);
  vertex(440,120);
  vertex(200,120);
  
  
  
  endContour();
  endShape(CLOSE);

}