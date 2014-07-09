var history = require('./history'),
    keypress = require('keypress');


var keyBindings = [
  function(key, session){
    if( key && key.ctrl && key.name === 'c' ){
      console.log('Bye!');
      process.exit();
    }
  }
]

function addBinding(func){
  keyBindings.push(func);
}

function start(){
  keypress(process.stdin);
  process.stdin.setRawMode( true );
  process.stdin.setEncoding( 'utf8' );
  process.stdin.resume();

  var session = {
    currentLine: '',
    history: history.begin()
  };

  process.stdin.on('keypress', function(ch, key){

    keyBindings.forEach(function(binding){
      binding(key, session);
    });
    
    if( key.name === 'enter' || key.name ===  'return'){
      console.log('');
      console.log(session.currentLine);
      session.currentLine = '';
      session.history = session.history.putLine(session.currentLine);
    }
    else if(ch){
      session.currentLine += ch;
      process.stdout.write(ch);
    }

  });
}


module.exports = {
  start: start,
  addBinding: addBinding
}