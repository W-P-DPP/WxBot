import eventEmitter from './utils/EventEmitter.ts';

eventEmitter.on("testEvent", (data: any) => {
  console.log("testEvent received with data:", data);
});
