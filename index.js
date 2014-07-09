var ioloop = require('./lib/ioloop');


ioloop.addBinding(function(key, session){
  if( key && key.name === 'up'){
    console.log('pressed up key');
  }
});

ioloop.start();