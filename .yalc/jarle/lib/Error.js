"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Error;

var _react = _interopRequireDefault(require("react"));

var _Provider = require("./Provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displays an sytax or runtime error that occured when rendering the code
 *
 */
function Error(props) {
  const error = (0, _Provider.useError)();
  return error ? /*#__PURE__*/_react.default.createElement("pre", props, error.toString()) : null;
}