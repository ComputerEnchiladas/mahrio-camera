var RaspiCam = require('raspicam');
const exec = require('child_process').exec;

var output = 'myimage_%04d.jpg'; // output dynamic, 001, 002, 003, etc.

var camera = new RaspiCam({
  mode: 'timelapse', 
  output: output,
  height: 720,
  width: 1280,
  quality: 100,
  timeout: 60000, // record for 60 seconds
  tl: 1000	  // take a picture every 1 second
});

camera.start();


camera.on('exit', function(){ 
  // sudo apt-get -y install libav-tools
  exec('avconv -r 2 -i '+output+' -r 2 -vcodec libx264 -crf 20 -g 15 timelapse.mp4', function(err){
    exec('rm myimage*');
  });
  camera.stop();
});


