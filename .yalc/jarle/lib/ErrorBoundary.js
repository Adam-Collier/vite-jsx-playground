"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Provider = require("./Provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CodeLiveErrorBoundary extends _react.default.Component {
  componentDidCatch(error) {
    this.context.onError(error);
  }

  render() {
    const {
      element: Element
    } = this.props;
    return typeof Element === 'function' ? /*#__PURE__*/_react.default.createElement(Element, null) : Element;
  }

}

CodeLiveErrorBoundary.contextType = _Provider.Context;
var _default = CodeLiveErrorBoundary;
exports.default = _default;