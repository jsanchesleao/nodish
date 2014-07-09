var keypress = require('keypress'),
    keyHandlers = require('./keyHandlers'),
    session = require('./session'),
    io = require('./io');


var keyBindings = keyHandlers;

function setBinding(name, func){
  keyBindings[name] = func;
}

function start(){
  var currentSession = session.create();
  keypress(process.stdin);
  process.stdin.setRawMode( true );
  process.stdin.setEncoding( 'utf8' );
  process.stdin.resume();

  io.prompt();
  process.stdin.on('keypress', function(ch, key){

    currentSession.setNextChar(ch);

    for(var i in keyBindings){
      if(keyBindings.hasOwnProperty(i)){
        keyBindings[i](key, currentSession);
      }
    }
    
    if( key.name === 'enter' || key.name ===  'return'){
      io.newline();
      io.writeln( currentSession.getCurrentLine() );
      currentSession.nextLine();
      io.prompt();
    }
    else if(currentSession.getNextChar()){
      currentSession.persistChar();
      io.clearLine();
      io.prompt();
      io.write( currentSession.getCurrentLine() );
      io.moveLeft( currentSession.getCurrentLine().length - currentSession.getCursorPosition() );
    }

  });
}


module.exports = {
  start: start,
  setPrefix: io.setPrefix,
  setBinding: setBinding
}