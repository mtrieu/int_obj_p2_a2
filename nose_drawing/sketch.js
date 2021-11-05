let cam;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;

function setup () {
    createCanvas(windowWidth, windowHeight);
    cam = createCapture(cam);
    cam.size(width, height);
    cam.hide();

    poseNet = ml5.poseNet(cam, modelReady);
    poseNet.on('pose', gotPoses);
}


function gotPoses (poses) {
    if (poses.length > 0) {
        let nX = poses[0].pose.keypoints[0].position.x;
        let nY = poses[0].pose.keypoints[0].position.y;
        let eX = poses[0].pose.keypoints[1].position.x;
        let eY = poses[0].pose.keypoints[1].position.y;
        noseX = lerp(noseX, nX, 0.5);
        noseY = lerp(noseY, nY, 0.5);
        eyelX = lerp(eyelX, eX, 0.5);
        eyelY = lerp(eyelY, eY, 0.5);
    }
}

function modelReady () {
    console.log("model ready");
}
function draw (){
  
 r = random(255); // r is a random number between 0 - 255
  g = random(255); // g is a random number betwen 100 - 200
  b = random(255); // b is a random number between 0 - 100
  a = random(255);

    let d = dist(noseX, noseY, eyelX, eyelY);

    fill(r, g, b, a);
    ellipse(noseX, noseY, d);
}
