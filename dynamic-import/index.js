const EventEmitter = require('./eventEmitter.js');

let emitter = new EventEmitter();

emitter.on('myEvent', function sth() {
  emitter.on('myEvent', sth);
  console.log('hi');
});

emitter.emit('myEvent');
emitter.emit('myEvent');