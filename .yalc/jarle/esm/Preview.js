function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import useCallbackRef from '@restart/hooks/useCallbackRef';
import React, { useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { useElement, useError } from './Provider';
let holderjs;

if (typeof window !== 'undefined') {
  try {
    holderjs = require('holderjs');
  } catch (err) {
    /** ignore */
  }
}
/**
 * The component that renders the user's code.
 */


const Preview = (_ref) => {
  let {
    className,
    holderTheme
  } = _ref,
      props = _objectWithoutProperties(_ref, ["className", "holderTheme"]);

  const [example, attachRef] = useCallbackRef();
  const hasTheme = !!holderTheme && holderjs;
  const element = useElement();
  const error = useError();
  useEffect(() => {
    if (hasTheme) holderjs.addTheme('userTheme', holderTheme); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasTheme]);
  useEffect(() => {
    if (!example || !holderjs) return;
    holderjs.run({
      theme: hasTheme ? 'userTheme' : undefined,
      images: example.querySelectorAll('img')
    });
  }, [element, example, hasTheme]); // prevent links in examples from navigating

  const handleClick = e => {
    if (e.target.tagName === 'A' || e.target.closest('a')) e.preventDefault();
  };

  const previewProps = _objectSpread({
    role: "region",
    "aria-label": "Code Example"
  }, props);

  return error ? null :
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
  React.createElement("div", _extends({
    ref: attachRef,
    className: className,
    onClick: handleClick
  }, previewProps), /*#__PURE__*/React.createElement(ErrorBoundary, {
    element: element
  }));
};

export default Preview;