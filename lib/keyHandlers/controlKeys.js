var io = require('../io');

module.exports = {
  ctrlC: function(key, session){
    if( key && key.ctrl && key.name === 'c' ){
      console.log('Bye!');
      process.exit();
    }
  },

  ctrlL: function(key, session){
    if( key && key.ctrl && key.name === 'l' ){
      io.clearAll();
      io.prompt();

      session.nextChar = '';
    }
  }
};