var RaspiCam = require('raspicam');

var camera = new RaspiCam({
  mode: 'photo', 
  output: Date.now()+'.jpg',
  height: 720,
  width: 1280,
  quality: 100
});

camera.start();

camera.on('exit', function(){ 
  console.log('stopped');
  camera.stop();
  camera.set('output', Date.now() + '.jpg');
  camera.start(); 
});
