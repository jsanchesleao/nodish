var io = require('../io');

module.exports = {
  backspace: function(key, session){
    if(key && key.name === 'backspace'){
      session.nextChar = '';
      io.moveLeft();
      process.stdout.write(' ');
      io.moveLeft();
    }
  }
}