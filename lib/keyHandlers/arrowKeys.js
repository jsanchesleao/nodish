var io = require('../io');

module.exports = {
  up: function(key, session){
    if( key && key.name === 'up'){
      session.moveHistoryBackwards();
      if( session.getHistory().current() ){
        session.setCurrentLine( session.getHistory().current() );
        session.moveToEnd();
        io.clearLine();
        io.prompt();
        io.write( session.getHistory().current() )
      }
    }
  },

  down: function(key, session){
    if( key && key.name === 'down'){
      session.moveHistoryForwards();
      if( session.getHistory().current() ){
        session.setCurrentLine( session.getHistory().current() );
        session.moveToEnd();
        io.clearLine();
        io.prompt();
        io.write( session.getHistory().current() )
      }
    }
  },

  left: function(key, session){
    if( key && key.name === 'left'){
      if( session.getCursorPosition() > 0 ){
        io.moveLeft();
        session.moveLeft();
      }
    }
  },

  right: function(key, session){
    if( key && key.name === 'right'){
      if( session.getCursorPosition() < session.getCurrentLine().length ){
        io.moveRight();
        session.moveRight();
      }
    }
  }

};