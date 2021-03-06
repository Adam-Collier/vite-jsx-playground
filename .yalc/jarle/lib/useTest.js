"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useCommittedRef = _interopRequireDefault(require("@restart/hooks/useCommittedRef"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useInterval(fn, ms, paused = false, runImmediately = false) {
  let handle;
  const fnRef = (0, _useCommittedRef.default)(fn); // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.

  const pausedRef = (0, _useCommittedRef.default)(paused);

  const tick = () => {
    if (pausedRef.current) return;
    fnRef.current();
    schedule(); // eslint-disable-line no-use-before-define
  };

  const schedule = () => {
    clearTimeout(handle);
    handle = setTimeout(tick, ms);
  };

  (0, _react.useEffect)(() => {
    if (runImmediately) {
      tick();
    } else {
      schedule();
    }

    return () => clearTimeout(handle);
  }, [paused, runImmediately]);
}

var _default = useInterval;
exports.default = _default;