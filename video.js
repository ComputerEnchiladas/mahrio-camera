var RaspiCam = require('raspicam');
const exec = require('child_process').exec;

var output = 'video.h264';

var camera = new RaspiCam({
  mode: 'video', 
  output: output,
  width: 1280,
  height: 720,
  bitrate: 3000000,
  timeout: 60000,
  framerate: 23
});

camera.start();

camera.on('exit', function(){ 
  console.log('stopped');
  camera.stop();

  //sudo apt-get install gpac
  exec('MP4Box  -fps 23  -add '+output+' video.mp4', function(){
    exec('rm '+output);
  });
});

