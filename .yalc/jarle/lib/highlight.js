"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prismReactRenderer = require("prism-react-renderer");

var _default = (code, language) => {
  const grammar = language && _prismReactRenderer.Prism.languages[language];
  return grammar ? _prismReactRenderer.Prism.highlight(code, grammar, language) : code;
};

exports.default = _default;