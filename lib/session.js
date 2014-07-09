var history = require('./history');

function create(){
  var currentLine = [],
  sessionHistory = history.begin(),
  nextChar = '',
  cursor = 0;

  function moveHistoryBackwards(){
    sessionHistory = sessionHistory.lastLine();
  }

  function moveHistoryForwards(){
    sessionHistory = sessionHistory.nextLine();
  }

  function moveToEnd(){
    cursor = currentLine.length;
  }

  function moveLeft(){
    cursor = (cursor > 0) ? cursor - 1 : 0
  }

  function moveRight(){
    cursor = (cursor < currentLine.length) ? cursor + 1 : 0
  }

  function getCurrentLine(){
    return currentLine.join('');
  }

  function setCurrentLine(line){
    currentLine = line.split('');
  }

  function getCursorPosition(){
    return cursor;
  }

  function setNextChar(ch){
    nextChar = ch;
  }

  function getNextChar(ch){
    return nextChar;
  }

  function persistChar(){
    currentLine.splice(cursor, 0, nextChar);
    cursor++;
  }

  function nextLine(){
    sessionHistory = sessionHistory.putLine( getCurrentLine() );
    currentLine = [];
    cursor = 0;
  }

  function getHistory(){
    return sessionHistory;
  }

  return {
    getCurrentLine: getCurrentLine,
    setCurrentLine: setCurrentLine,
    getCursorPosition: getCursorPosition,
    setNextChar: setNextChar,
    getNextChar: getNextChar,
    persistChar: persistChar,
    nextLine: nextLine,
    getHistory: getHistory,
    moveHistoryBackwards: moveHistoryBackwards,
    moveHistoryForwards: moveHistoryForwards,

    moveLeft: moveLeft,
    moveRight: moveRight,
    moveToEnd: moveToEnd
  };
}

module.exports = {
  create: create
};