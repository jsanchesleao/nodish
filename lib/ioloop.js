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
    currentLine: '',
    history: history.begin(),
    nextChar: ''
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
      console.log('');
      console.log(session.currentLine);
      session.history = session.history.putLine(session.currentLine);
      session.currentLine = '';
      io.prompt();
    }
    else if(session.nextChar){
      session.currentLine += session.nextChar;
      process.stdout.write(session.nextChar);
    }

  });
}


module.exports = {
  start: start,
  setPrefix: io.setPrefix,
  setBinding: setBinding
}