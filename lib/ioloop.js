var history = require('./history'),
    keypress = require('keypress'),
    keyHandlers = require('./keyHandlers'),
    io = require('./io');


var keyBindings = keyHandlers;

function setBinding(name, func){
  keyBindings[name] = func;
}

function start(){
  keypress(process.stdin);
  process.stdin.setRawMode( true );
  process.stdin.setEncoding( 'utf8' );
  process.stdin.resume();

  var session = {
    currentLine: [],
    history: history.begin(),
    nextChar: '',
    cursor: 0
  };

  io.prompt();
  process.stdin.on('keypress', function(ch, key){

    session.nextChar = ch;

    for(var i in keyBindings){
      if(keyBindings.hasOwnProperty(i)){
        keyBindings[i](key, session);
      }
    }
    
    if( key.name === 'enter' || key.name ===  'return'){
      io.newline();
      io.writeln(session.currentLine.join(''));
      session.history = session.history.putLine( session.currentLine.join('') );
      session.currentLine = [];
      session.cursor = 0;
      io.prompt();
    }
    else if(session.nextChar){
      session.currentLine.splice(session.cursor, 0, session.nextChar);
      session.cursor++;
      io.clearLine();
      io.prompt();
      io.write( session.currentLine.join('') )
      io.moveLeft( session.currentLine.length - session.cursor );
    }

  });
}


module.exports = {
  start: start,
  setPrefix: io.setPrefix,
  setBinding: setBinding
}