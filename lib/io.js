var _ = require('lodash');

var prefix = 'nsh';

function prompt(){
  var _prefix = prefix;
  if( prefix.constructor === Function ){
    _prefix = prefix();
  }
  process.stdout.write( _prefix );
  process.stdout.write( '> ' );
}

function clearLine(){
  process.stdout.clearLine();
  process.stdout.write('\r');
}

function clearAll(){
  process.stdout.write('\033[2J\033[0;0H');
}

function write(data){
  process.stdout.write(data);
}

function newline(){
  console.log('');
}

function writeln(data){
  write(data);
  newline()
}

function setPrefix(_prefix){
  prefix = _prefix;
}

function moveLeft(){
  process.stdout.write('\u001b[D');
}

function moveRight(){
  process.stdout.write('\u001b[C');
}

function moveDown(){
  process.stdout.write('\u001b[B');
}

function moveUp(){
  process.stdout.write('\u001b[A');
}

function times(func, _n){
  var n = (typeof _n === 'undefined') ? 1 : _n;
  for(var i = 0; i < n; i++){
    func();
  }
}

module.exports = {
  prompt: prompt,
  setPrefix: setPrefix,
  clearLine: clearLine,
  clearAll: clearAll,
  write: write,
  writeln: writeln,
  newline: _.partial(times, newline),
  moveLeft: _.partial(times, moveLeft),
  moveRight: _.partial(times, moveRight),
  moveUp: _.partial(times, moveUp),
  moveDown: _.partial(times, moveDown)
};