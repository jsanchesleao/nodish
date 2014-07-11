var io = require('../io'),
    parser = require('./parser');

var registry = {
}

function processCommand(session){

  var statement = parser.parse(session.getCurrentLine());

  if(!statement.name){
    return;
  }

  if( registry[statement.name] ){
    return registry[statement.name].apply(session, statement.args);
  }
  else{
    io.writeln('Unknown command: '+statement.name);
  }

}

function findCommandNames(prefix){
  var names = [];
  for(var i in registry){
    if(registry.hasOwnProperty(i) && i.indexOf(prefix) === 0){
      names.push(i);
    }
  }
  return names.sort();
}


module.exports = {
  process: processCommand,
  findCommandNames: findCommandNames,
  registerCommand: function(name, func){
    registry[name] = func;
  }
}
