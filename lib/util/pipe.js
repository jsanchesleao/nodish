var spawn = require('child_process').spawn;

function doSpawn(command, args){

  var child = spawn(command, args);

  process.stdin.pipe( child.stdin );
  process.stdout.pipe( child.stdout );

  child.on('error', function(){
    console.log('error');
  });

}

module.exports = {
  spawn: doSpawn
};