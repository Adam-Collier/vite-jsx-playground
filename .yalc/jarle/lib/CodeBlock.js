"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapTokens = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _prismReactRenderer = _interopRequireWildcard(require("prism-react-renderer"));

var _react = _interopRequireDefault(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function addErrorHighlight(props, index, errorLocation) {
  if (errorLocation && index === errorLocation.line) {
    props.className = (0, _classnames.default)(props.className, 'token-line-error');
  }

  return props;
}

const mapTokens = ({
  tokens,
  getLineProps,
  getTokenProps,
  errorLocation
}) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, tokens.map((line, i) =>
/*#__PURE__*/
// eslint-disable-next-line react/no-array-index-key
_react.default.createElement("div", addErrorHighlight(getLineProps({
  line,
  key: String(i)
}), i, errorLocation), line.map((token, ii) =>
/*#__PURE__*/
// eslint-disable-next-line react/no-array-index-key
_react.default.createElement("span", _extends({
  key: ii
}, getTokenProps({
  token,
  key: String(ii)
})))))));

exports.mapTokens = mapTokens;

function CodeBlock(_ref) {
  let {
    code,
    theme,
    language,
    lineNumbers
  } = _ref,
      props = _objectWithoutProperties(_ref, ["code", "theme", "language", "lineNumbers"]);

  const style = typeof (theme === null || theme === void 0 ? void 0 : theme.plain) === 'object' ? theme.plain : {};
  return /*#__PURE__*/_react.default.createElement(_prismReactRenderer.default, {
    theme: theme,
    Prism: _prismReactRenderer.Prism,
    code: code.trim(),
    language: language
  }, hl => /*#__PURE__*/_react.default.createElement("pre", {
    className: (0, _classnames.default)(props.className, hl.className),
    style: _objectSpread(_objectSpread(_objectSpread({}, props.style), style), hl.style)
  }, /*#__PURE__*/_react.default.createElement("code", null, mapTokens(_objectSpread(_objectSpread({}, hl), {}, {
    lineNumbers,
    hasTheme: !!theme
  })))));
}

var _default = CodeBlock;
exports.default = _default;