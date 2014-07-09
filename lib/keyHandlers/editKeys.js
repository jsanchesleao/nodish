var io = require('../io');

module.exports = {
  backspace: function(key, session){
    if(key && key.name === 'backspace'){
      session.nextChar = '';
      if( session.currentLine.length > 0 ){
        io.moveLeft();
        process.stdout.write(' ');
        io.moveLeft();
        session.currentLine = session.currentLine.slice(0, session.currentLine.length - 1);
      }
    }
  }
}