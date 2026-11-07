import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();

myEmitter.on('myEvent', () => console.log('First event listener'));
myEmitter.on('myEvent', () => console.log('Second event listener'));
myEmitter.on('myOtherEvent', () => console.log('Other event listener'));

console.log(myEmitter.getMaxListeners());
myEmitter.setMaxListeners(15);
console.log(myEmitter.getMaxListeners());
console.log(myEmitter.eventNames());

setTimeout(() => myEmitter.emit('myEvent'), 1000);

setTimeout(() => myEmitter.emit('myOtherEvent'), 1500);
