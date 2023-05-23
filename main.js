song1 = "";
song2 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1Status = "";
song2Status = "";
LWX = 0;
LWY = 0;
RWX = 0;
RWY = 0;
function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
console.log('PoseNet Is Initialized');
}
function draw()
{
    image(video,0,0,600,500);

    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("maroon");
    stroke("maroon");
    
    if(scoreLeftWrist > 0.2)
    {
       circle(LWX,LWY,20);
       song2.stop();
       if(song1Status == false)
       {
        song1.play();
        document.getElementById("song_name").innerHTML = "Song name = " + Song1;
       }
    }
    if(scoreRightWrist > 0.2)
    {
       circle(RWX,RWY,20);
       song1.stop();
       if(song2Status == false)
       {
        song2.play();
        document.getElementById("song_name").innerHTML = "Song name = " + song2;
       }
    }
}
function gotPoses(results)
{

    if(results.length > 0)
    {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);      

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);

        console.log(results);
        LWX = results[0].pose.leftWrist.x;
        LWY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + LWX +"leftWRistY = "+ LWY);
    
        RWX = results[0].pose.rightWrist.x;
        RWY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + RWX +" rightWristY = "+ RWY);
    
    }
}
