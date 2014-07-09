var io = require('../io');

module.exports = {
  up: function(key, session){
    if( key && key.name === 'up'){
      session.history = session.history.lastLine();
      if( session.history.current() ){
        session.currentLine = session.history.current().split('');
        session.cursor = session.history.current().length;
        io.clearLine();
        io.prompt();
        io.write( session.history.current() )
      }
    }
  },

  down: function(key, session){
    if( key && key.name === 'down'){
      session.history = session.history.nextLine();
      if( session.history.current() ){
        session.currentLine = session.history.current().split('');
        session.cursor = session.history.current().length;
        io.clearLine();
        io.prompt();
        io.write( session.history.current() )
      }
    }
  },

  left: function(key, session){
    if( key && key.name === 'left'){
      if( session.cursor > 0 ){
        io.moveLeft();
        session.cursor--;
      }
    }
  },

  right: function(key, session){
    if( key && key.name === 'right'){
      if( session.cursor < session.currentLine.length ){
        io.moveRight();
        session.cursor++;
      }
    }
  }

};