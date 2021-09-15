"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = ({
  wrapper
}) => ({
  visitor: {
    Program: {
      leave(node) {
        wrapper(this, node);
      }

    }
  }
});

exports.default = _default;