var ioloop = require('./lib/ioloop'),
    io = require('./lib/io'),
    commands = require('./lib/commands');


function start(name){
  io.setPrefix(name || 'nodish');
  ioloop.start();
}


module.exports = {
  io: io,
  commands: commands,
  register: commands.registerCommand,
  start: start
}