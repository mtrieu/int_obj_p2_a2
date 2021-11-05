let video;
let poseNet;
let glasses;
let noseX = 0;
let noseY=0;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;

let shape;

function preload() {
    glasses = loadImage("img/glasses.png");
}

function setup() {
    createCanvas(640, 480);
  video = createCapture(VIDEO);
    video.hide();
  
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPosition);


}


function modelReady() {
    console.log("model ready");
}

function gotPosition(pose) {
    if (pose.length > 0) {
    let rX = pose[0].pose.keypoints[2].position.x;
    let rY = pose[0].pose.keypoints[2].position.y;
    let eX = pose[0].pose.keypoints[1].position.x;
    let eY = pose[0].pose.keypoints[1].position.y;
    let nX = pose[0].pose.keypoints[0].position.x;
    let nY = pose[0].pose.keypoints[0].position.y;
  
    eyerX = lerp(eyerX, rX, 0.9);
    eyerY = lerp(eyerY, rY, 0.9);
    eyelX = lerp(eyelX, eX, 0.9);
    eyelY = lerp(eyelY, eY, 0.9);
    noseX = lerp(noseX, nX, 0.9);
    noseY = lerp(noseY, nY, 0.9); 
    }
}

function draw(){
  let dr = dist(noseX, noseY, eyerX, eyerY);
  let dl = dist(noseX, noseY, eyelX, eyelY);
  
    image(video, 0, 0, width, height);
  // image(glasses, eyerX-40,eyerY-40, eyelX-eyerX+80, eyelY-eyerY+80);
  image(glasses, eyerX-40,eyerY-40, dl+90, 80);
  
 

}

// A function to draw ellipses over the detected keypoints
