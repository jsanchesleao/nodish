module.exports = {
  ctrlC: function(key, session){
    if( key && key.ctrl && key.name === 'c' ){
      console.log('Bye!');
      process.exit();
    }
  }
};