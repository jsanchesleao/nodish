var nodish = require('../');


nodish.register('ls', function(){
  var args = Array.prototype.slice.call(arguments);
  this.spawn('ls', args);
});

nodish.register('cat', function(){
  var args = Array.prototype.slice.call(arguments);
  this.spawn('cat', args);
});

nodish.register('git', function(){
  var args = Array.prototype.slice.call(arguments);
  this.spawn('git', args);
});

nodish.register('run', function(){
  var args = Array.prototype.slice.call(arguments);
  this.spawn('node', args);
});


nodish.start('simple');