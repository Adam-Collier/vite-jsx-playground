function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import cn from 'classnames';
import Highlight, { Prism } from 'prism-react-renderer';
import React from 'react';

function addErrorHighlight(props, index, errorLocation) {
  if (errorLocation && index === errorLocation.line) {
    props.className = cn(props.className, 'token-line-error');
  }

  return props;
}

export const mapTokens = ({
  tokens,
  getLineProps,
  getTokenProps,
  errorLocation
}) => /*#__PURE__*/React.createElement(React.Fragment, null, tokens.map((line, i) =>
/*#__PURE__*/
// eslint-disable-next-line react/no-array-index-key
React.createElement("div", addErrorHighlight(getLineProps({
  line,
  key: String(i)
}), i, errorLocation), line.map((token, ii) =>
/*#__PURE__*/
// eslint-disable-next-line react/no-array-index-key
React.createElement("span", _extends({
  key: ii
}, getTokenProps({
  token,
  key: String(ii)
})))))));

function CodeBlock(_ref) {
  let {
    code,
    theme,
    language,
    lineNumbers
  } = _ref,
      props = _objectWithoutProperties(_ref, ["code", "theme", "language", "lineNumbers"]);

  const style = typeof (theme === null || theme === void 0 ? void 0 : theme.plain) === 'object' ? theme.plain : {};
  return /*#__PURE__*/React.createElement(Highlight, {
    theme: theme,
    Prism: Prism,
    code: code.trim(),
    language: language
  }, hl => /*#__PURE__*/React.createElement("pre", {
    className: cn(props.className, hl.className),
    style: _objectSpread(_objectSpread(_objectSpread({}, props.style), style), hl.style)
  }, /*#__PURE__*/React.createElement("code", null, mapTokens(_objectSpread(_objectSpread({}, hl), {}, {
    lineNumbers,
    hasTheme: !!theme
  })))));
}

export default CodeBlock;