var io = require('../io');

module.exports = {
  backspace: function(key, session){
    if(key && key.name === 'backspace'){
      session.setNextChar('');
      if( session.getCurrentLine().length > 0 ){
        io.moveLeft();
        process.stdout.write(' ');
        io.moveLeft();
        session.setCurrentLine( session.getCurrentLine().slice(0, session.getCurrentLine().length - 1) );
      }
    }
  }
}