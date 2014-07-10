var ioloop = require('./lib/ioloop'),
    io = require('./lib/io'),
    commands = require('./lib/commands');


io.setPrefix('nodish');

commands.registerCommand('pwd', function () {
  console.log( __dirname );
});

ioloop.start();