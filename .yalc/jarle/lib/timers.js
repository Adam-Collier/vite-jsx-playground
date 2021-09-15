"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTimers;

function createTimers() {
  let handles = new Map();

  const clear = fn => id => {
    handles.delete(id);
    fn(id);
  };

  const set = (fn, fn2) => (...args) => {
    let handle = fn(...args);
    handles.set(handle, () => fn2(handle));
    return handle;
  };

  return [() => {
    handles.forEach(value => value());
    handles.clear();
  }, {
    setTimeout: set(setTimeout, clearTimeout),
    clearTimeout: clear(clearTimeout),
    setInterval: set(setInterval, clearInterval),
    clearInterval: clear(clearInterval),
    requestAnimationFrame: set(requestAnimationFrame, cancelAnimationFrame),
    cancelAnimationFrame: clear(cancelAnimationFrame)
  }];
}