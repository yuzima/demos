/*----------------------------------------------------------*/

const EventEmitter = require('./eventEmitter.js');

let emitter = new EventEmitter();

// 是否会死循环？
emitter.on('myEvent', function sth() {
  emitter.on('myEvent', sth);
  console.log('hi');
});

emitter.emit('myEvent');
// 打印： hi

// 不会，因为每次执行 emit 的时候，会获取 length = listeners.length 长度
// 执行 for (i = 0; i < length; i++) { ... }
// 在 on 回调里添加 listener 不会影响到当前执行的 listeners，只会影响下一次的 emit

/*----------------------------------------------------------*/

// 是否会导致 callbackB 不执行
const callbackA = () => {
  console.log('A');
  emitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA 移除了监听器 callbackB，但它依然会被调用。
// 触发时内部的监听器数组为 [callbackA, callbackB]
// removeListener 的行为是复制一个新的删除了 callbackB 的 Listeners 数组赋值给 this._events[evt]
// 但不会影响到 emit 执行函数里的 Listeners 指向的对象
myEmitter.emit('event');

/*----------------------------------------------------------*/

// 是否会死循环？
emitter.on('myEvent', () => {
  console.log('hi');
  emitter.emit('myEvent');
});

emitter.emit('myEvent');

// 会，因为 emit 会立即再次触发 on 的回调，导致死循环
