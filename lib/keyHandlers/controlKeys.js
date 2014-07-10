var io = require('../io');

module.exports = {
  ctrlC: function(key, session){
    if( key && key.ctrl && key.name === 'c' ){
      io.newline();
      io.writeln('Bye');
      io.newline();
      process.exit();
    }
  },

  ctrlD: function(key, session){
    if( key && key.ctrl && key.name === 'd' ){
      io.newline();
      io.writeln('Bye');
      io.newline();
      process.exit();
    }
  },

  ctrlL: function(key, session){
    if( key && key.ctrl && key.name === 'l' ){
      io.clearAll();
      io.prompt();
      session.setNextChar('');
    }
  }
};