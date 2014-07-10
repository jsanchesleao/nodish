var keypress = require('keypress'),
    keyHandlers = require('./keyHandlers'),
    session = require('./session'),
    commands = require('./commands')
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

    if( currentSession.isPiping() ){
      currentSession.getPipingProcess().stdin.write(ch);
      return;
    }

    currentSession.setNextChar(ch);

    for(var i in keyBindings){
      if(keyBindings.hasOwnProperty(i)){
        keyBindings[i](key, currentSession);
      }
    }
    
    if( key && (key.name === 'enter' || key.name ===  'return') ){
      io.newline();
      commands.process(currentSession);
      currentSession.nextLine();
      if( !currentSession.isPiping() ){
        io.newline();
        io.prompt();
      }
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