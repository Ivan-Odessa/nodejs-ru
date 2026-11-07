import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();

const timeoutListenerFn = (secondsQty) => {
  console.log(`Timeout event in ${secondsQty} seconds!`);
};

myEmitter.on('timeout', timeoutListenerFn);

setTimeout(() => myEmitter.emit('timeout', 1), 1000);
setTimeout(() => myEmitter.emit('timeout', 2), 2000);

myEmitter.once('singleEvent', () => {
  console.log('Single event occurred');
});

setTimeout(() => myEmitter.emit('singleEvent'), 500);
setTimeout(() => myEmitter.emit('singleEvent'), 2000);

setTimeout(() => myEmitter.off('timeout', timeoutListenerFn), 3000);
setTimeout(() => myEmitter.emit('timeout', 4), 4000);
