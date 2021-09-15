"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseImports = parseImports;
exports.default = void 0;

var _transform = require("./transform");

var _jsx = _interopRequireDefault(require("./transform/jsx"));

var _modules = _interopRequireDefault(require("./transform/modules"));

var _wrapContent = _interopRequireDefault(require("./transform/wrapContent"));

var _wrapLastExpression = _interopRequireDefault(require("./transform/wrapLastExpression"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const truthy = value => !!value;

function parseImports(input, remove) {
  const imports = [];
  const {
    code,
    map,
    ast
  } = (0, _transform.transform)(input, {
    file: 'compiled.js',
    source: 'example.js',
    plugins: [(0, _modules.default)({
      remove,
      imports
    })]
  });
  return {
    code,
    ast,
    imports,
    map
  };
}

var _default = (input, {
  inline: _inline = false,
  wrapper
} = {}) => {
  const imports = [];
  const {
    code,
    ast,
    map
  } = (0, _transform.transform)(input, {
    file: 'compiled.js',
    source: 'example.js',
    plugins: [(0, _jsx.default)(), (0, _modules.default)(), _inline && (0, _wrapLastExpression.default)(), wrapper && (0, _wrapContent.default)({
      wrapper
    })].filter(truthy)
  });
  return {
    code,
    ast,
    imports,
    map
  };
};

exports.default = _default;