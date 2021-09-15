function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Highlight, { Prism } from 'prism-react-renderer';
import useMergeState from '@restart/hooks/useMergeState';
import useStableMemo from '@restart/hooks/useStableMemo';
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import { mapTokens } from './CodeBlock';
import InfoMessage from './InfoMessage';
import { useLiveContext } from './Provider';
import LineNumber from './LineNumber';
let uid = 0;

function useStateFromProp(prop) {
  const state = useState(prop);
  const firstRef = useRef(true);
  useStableMemo(() => {
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
const Editor = /*#__PURE__*/React.forwardRef(({
  style,
  className,
  theme,
  infoComponent: Info = InfoMessage,
  lineNumbers,
  infoSrOnly: _infoSrOnly = false
}, ref) => {
  const {
    code: contextCode,
    theme: contextTheme,
    language,
    onChange,
    error
  } = useLiveContext();
  const userTheme = theme || contextTheme;
  const [code, setCode] = useStateFromProp(contextCode);
  const mouseDown = useRef(false);
  useLayoutEffect(() => {
    onChange(code || '');
  }, [code, onChange]);
  const [{
    visible,
    ignoreTab,
    keyboardFocused
  }, setState] = useMergeState({
    visible: false,
    ignoreTab: false,
    keyboardFocused: false
  });
  const id = useMemo(() => `described-by-${++uid}`, []);

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

  const highlight = useCallback(value => /*#__PURE__*/React.createElement(Highlight, {
    theme: userTheme,
    Prism: Prism,
    code: value,
    language: language
  }, hl => mapTokens(_objectSpread(_objectSpread({}, hl), {}, {
    hasTheme: !!userTheme,
    errorLocation: error === null || error === void 0 ? void 0 : error.location
  }))), [userTheme, language, error]);

  const baseTheme = _objectSpread(_objectSpread({
    whiteSpace: 'pre',
    fontFamily: 'monospace'
  }, (userTheme === null || userTheme === void 0 ? void 0 : userTheme.plain) || {}), style);

  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: className,
    style: _objectSpread(_objectSpread({}, baseTheme), {}, {
      display: 'grid',
      position: 'relative',
      gridTemplateColumns: 'auto 100%'
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "line-numbers"
  }, lineNumbers && (code || '').split(/\n/g).map((_, i) => /*#__PURE__*/React.createElement(LineNumber, {
    theme: userTheme
  }, i + 1))), /*#__PURE__*/React.createElement(SimpleCodeEditor, {
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
  }), visible && (keyboardFocused || !ignoreTab) && /*#__PURE__*/React.createElement(Info, {
    id: id,
    "aria-live": "polite",
    srOnly: _infoSrOnly
  }, ignoreTab ? /*#__PURE__*/React.createElement(React.Fragment, null, "Press ", /*#__PURE__*/React.createElement("kbd", null, "enter"), " or type a key to enable tab-to-indent") : /*#__PURE__*/React.createElement(React.Fragment, null, "Press ", /*#__PURE__*/React.createElement("kbd", null, "esc"), " to disable tab-to-indent")));
});
export default Editor;