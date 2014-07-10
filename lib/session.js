var history = require('./history'),
    spawn = require('child_process').spawn;

function create(){
  var currentLine = [],
  sessionHistory = history.begin(),
  nextChar = '',
  piping = false,
  pipingProcess,
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

  function concatString(text){
    currentLine = currentLine.concat( text.split('') );
  }

  function doSpawn(command, args){

    piping = true;
    pipingProcess = spawn(command, args);

    pipingProcess.stdout.on('data', function(key){
      process.stdout.write(key);
    });

    pipingProcess.on('close', function(){
      piping = false;
      io.newline();
      io.prompt();
    });

    pipingProcess.on('error', function(){
      piping = false;
      console.log('error');
    });

  }

  function isPiping(){
    return piping;
  }

  function getPipingProcess(){
    return pipingProcess;
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
    moveToEnd: moveToEnd,

    concatString: concatString,
    spawn: doSpawn,
    isPiping: isPiping,
    getPipingProcess: getPipingProcess
  };
}

module.exports = {
  create: create
};