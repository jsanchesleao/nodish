var prefix = 'nsh';

function prompt(){
  var _prefix = prefix;
  if( prefix.constructor === Function ){
    _prefix = prefix();
  }
  process.stdout.write( _prefix );
  process.stdout.write( '> ' );
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

module.exports = {
  prompt: prompt,
  setPrefix: setPrefix,
  moveLeft: moveLeft,
  moveRight: moveRight,
  moveUp: moveUp,
  moveDown: moveDown
};