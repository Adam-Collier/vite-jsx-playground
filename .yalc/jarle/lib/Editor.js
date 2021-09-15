"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prismReactRenderer = _interopRequireWildcard(require("prism-react-renderer"));

var _useMergeState = _interopRequireDefault(require("@restart/hooks/useMergeState"));

var _useStableMemo = _interopRequireDefault(require("@restart/hooks/useStableMemo"));

var _react = _interopRequireWildcard(require("react"));

var _reactSimpleCodeEditor = _interopRequireDefault(require("react-simple-code-editor"));

var _CodeBlock = require("./CodeBlock");

var _InfoMessage = _interopRequireDefault(require("./InfoMessage"));

var _Provider = require("./Provider");

var _LineNumber = _interopRequireDefault(require("./LineNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let uid = 0;

function useStateFromProp(prop) {
  const state = (0, _react.useState)(prop);
  const firstRef = (0, _react.useRef)(true);
  (0, _useStableMemo.default)(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }

    state[1](prop);
  }, [prop]);
  return state;
}

/**
 * The Editor is the code text editor component, some props can be supplied directly
 * or take from the Provider context if available.
 */
const Editor = /*#__PURE__*/_react.default.forwardRef(({
  style,
  className,
  theme,
  infoComponent: Info = _InfoMessage.default,
  lineNumbers,
  infoSrOnly: _infoSrOnly = false
}, ref) => {
  const {
    code: contextCode,
    theme: contextTheme,
    language,
    onChange,
    error
  } = (0, _Provider.useLiveContext)();
  const userTheme = theme || contextTheme;
  const [code, setCode] = useStateFromProp(contextCode);
  const mouseDown = (0, _react.useRef)(false);
  (0, _react.useLayoutEffect)(() => {
    onChange(code || '');
  }, [code, onChange]);
  const [{
    visible,
    ignoreTab,
    keyboardFocused
  }, setState] = (0, _useMergeState.default)({
    visible: false,
    ignoreTab: false,
    keyboardFocused: false
  });
  const id = (0, _react.useMemo)(() => `described-by-${++uid}`, []);

  const handleKeyDown = event => {
    const {
      key
    } = event;

    if (ignoreTab && key !== 'Tab' && key !== 'Shift') {
      if (key === 'Enter') event.preventDefault();
      setState({
        ignoreTab: false
      });
    }

    if (!ignoreTab && key === 'Escape') {
      setState({
        ignoreTab: true
      });
    }
  };

  const handleFocus = e => {
    if (e.target !== e.currentTarget) return;
    setState({
      visible: true,
      ignoreTab: !mouseDown.current,
      keyboardFocused: !mouseDown.current
    });
  };

  const handleBlur = e => {
    if (e.target !== e.currentTarget) return;
    setState({
      visible: false
    });
  };

  const handleMouseDown = () => {
    mouseDown.current = true;
    setTimeout(() => {
      mouseDown.current = false;
    });
  };

  const highlight = (0, _react.useCallback)(value => /*#__PURE__*/_react.default.createElement(_prismReactRenderer.default, {
    theme: userTheme,
    Prism: _prismReactRenderer.Prism,
    code: value,
    language: language
  }, hl => (0, _CodeBlock.mapTokens)(_objectSpread(_objectSpread({}, hl), {}, {
    hasTheme: !!userTheme,
    errorLocation: error === null || error === void 0 ? void 0 : error.location
  }))), [userTheme, language, error]);

  const baseTheme = _objectSpread(_objectSpread({
    whiteSpace: 'pre',
    fontFamily: 'monospace'
  }, (userTheme === null || userTheme === void 0 ? void 0 : userTheme.plain) || {}), style);

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: className,
    style: _objectSpread(_objectSpread({}, baseTheme), {}, {
      display: 'grid',
      position: 'relative',
      gridTemplateColumns: 'auto 100%'
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "line-numbers"
  }, lineNumbers && (code || '').split(/\n/g).map((_, i) => /*#__PURE__*/_react.default.createElement(_LineNumber.default, {
    theme: userTheme
  }, i + 1))), /*#__PURE__*/_react.default.createElement(_reactSimpleCodeEditor.default, {
    value: code || '',
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onMouseDown: handleMouseDown,
    onValueChange: setCode,
    highlight: highlight,
    ignoreTabKey: ignoreTab,
    "aria-describedby": id,
    "aria-label": "Example code editor"
  }), visible && (keyboardFocused || !ignoreTab) && /*#__PURE__*/_react.default.createElement(Info, {
    id: id,
    "aria-live": "polite",
    srOnly: _infoSrOnly
  }, ignoreTab ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Press ", /*#__PURE__*/_react.default.createElement("kbd", null, "enter"), " or type a key to enable tab-to-indent") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Press ", /*#__PURE__*/_react.default.createElement("kbd", null, "esc"), " to disable tab-to-indent")));
});

var _default = Editor;
exports.default = _default;