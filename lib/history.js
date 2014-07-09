var _ = require('lodash');

function begin(lines, cursor){

  var history = {
    lines: lines || [''],
    cursor: cursor || 0
  }

  return {
    putLine: _.partial(putLine, history),
    lastLine: _.partial(lastLine, history),
    nextLine: _.partial(nextLine, history),
    restLength: _.partial(restLength, history),
    current: _.partial(current, history)
  }

}

function putLine(history, line){
  var lines = history.lines.concat(line);
  return begin( lines, lines.length -1 );
}

function lastLine(history){
  if( history.cursor === 0 ){
    return begin( history.lines, history.cursor );  
  }
  return begin( history.lines, history.cursor - 1 );
}

function nextLine(history){
  if( history.cursor === history.lines.length - 1 ){
    return begin( history.lines, history.cursor );  
  }
  return begin( history.lines, history.cursor + 1 );
}

function restLength(history){
  return history.cursor;
}

function current(history){
  var cursor = history.cursor + 1;
  if( cursor >= history.lines.length ){
    return '';
  }
  return history.lines[cursor];
}



module.exports = {
  begin: begin
}