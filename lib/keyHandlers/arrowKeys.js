module.exports = {
  up: function(key, session){
    if( key && key.name === 'up'){
      session.history = session.history.lastLine();
      if( session.history.current() ){
        process.stdout.write( session.history.current() );
      }
    }
  },

  down: function(key, session){
    if( key && key.name === 'down'){
      session.history = session.history.nextLine();
      if( session.history.current() ){
        process.stdout.write( session.history.current() );
      }
    }
  },

  left: function(key, session){
    if( key && key.name === 'left'){
      process.stdout.write(key.sequence);
    }
  },

  right: function(key, session){
    if( key && key.name === 'right'){
      process.stdout.write(key.sequence);
    }
  }

};