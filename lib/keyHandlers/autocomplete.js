var io = require('../io'),
    parser = require('../commands/parser');
    commands = require('../commands');


function applySuggestions(session){
  var words = session.getCurrentLine().split(/\r/),
      lastWord = words[words.length -1],
      names = commands.findCommandNames(lastWord);

  if(names.length === 0){
    return;
  }
  else if(names.length === 1){
    io.write( names[0].slice(lastWord.length) );
    session.concatString( names[0].slice(lastWord.length) );
    session.moveToEnd();
  }
  else{
    io.newline();
    io.writeln(names.join(' '));
    io.newline();
    io.prompt();
    io.write( session.getCurrentLine() );
  }
}

module.exports = {
  tab: function(key, session){
    if( key && key.name === 'tab'){
      applySuggestions(session);
      session.setNextChar('');
    }
  }
};