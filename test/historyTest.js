var assert = require('assert');

describe('History', function(){

  var history = require('../lib/history').begin();

  it('saves a line and recovers it', function(){

    var h = history.putLine('test line');

    var last = h.lastLine();

    assert.equal( h.restLength(), 1);
    assert.equal( last.restLength(), 0);
    assert.equal( last.current(), 'test line' );

  });

  it('walks backwards and forwards into history', function(){

    var h = history
      .putLine('test line')
      .putLine('another line')
      .putLine('omfg');

    var back2 = h.lastLine().lastLine();
    var back1 = back2.nextLine();

    assert.equal( h.restLength(), 3);
    assert.equal( back1.restLength(), 2);
    assert.equal( back2.restLength(), 1);
    assert.equal( back1.current(), 'omfg' );
    assert.equal( back2.current(), 'another line' );

  });

});