"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLiveContext = useLiveContext;
exports.useElement = useElement;
exports.useError = useError;
exports.default = Provider;
exports.objectZip = exports.Context = void 0;

var _useEventCallback = _interopRequireDefault(require("@restart/hooks/useEventCallback"));

var _useMounted = _interopRequireDefault(require("@restart/hooks/useMounted"));

var _react = _interopRequireWildcard(require("react"));

var _reactIs = require("react-is");

var _sourcemapCodec = require("sourcemap-codec");

var _transpile = _interopRequireWildcard(require("./transpile"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const prettierComment = /(\{\s*\/\*\s+prettier-ignore\s+\*\/\s*\})|(\/\/\s+prettier-ignore)/gim;
const hooks = {};
Object.entries(_react.default).forEach(([key, value]) => {
  if (key.startsWith('use')) hooks[key] = value;
});

const Context = /*#__PURE__*/_react.default.createContext({});

exports.Context = Context;

const getRequire = imports => function require(request) {
  if (!imports) throw new Error('no imports');
  if (!(request in imports)) throw new Error(`Module not found: ${request}`);
  return imports[request];
};

const wrapAsComponent = ctx => {
  ctx.prepend('return React.createElement(function StateContainer() {\n');
  ctx.append('\n})');
};

function handleError(err, result, fn) {
  var _result$map, _decoded$line;

  const fnStr = fn.toString(); // account for the function chrome lines

  const offset = fnStr.slice(0, fnStr.indexOf('{')).split(/\n/).length;
  let pos;

  if ('line' in err) {
    pos = {
      line: err.line,
      column: err.column
    };
  } else if ('lineNumber' in err) {
    pos = {
      line: err.lineNumber - 1,
      column: err.columnNumber - 1
    };
  } else {
    var _err$stack;

    const [, _line, col] = (_err$stack = err.stack) === null || _err$stack === void 0 ? void 0 : _err$stack.match(/at eval.+<anonymous>:(\d+):(\d+)/m);
    pos = {
      line: +_line - 1,
      column: +col - 1
    };
  }

  if (!pos) return err;
  const decoded = (0, _sourcemapCodec.decode)((_result$map = result.map) === null || _result$map === void 0 ? void 0 : _result$map.mappings);
  const line = pos.line - offset;
  const mapping = (_decoded$line = decoded[line]) === null || _decoded$line === void 0 ? void 0 : _decoded$line.find(([col]) => col === pos.column);

  if (mapping) {
    err.location = {
      line: mapping[2],
      column: mapping[3]
    };
  }

  return err;
}

function codeToComponent(code, {
  ast,
  scope,
  preample,
  renderAsComponent = false
}) {
  return new Promise((resolve, reject) => {
    const isInline = !code.match(/render\S*\(\S*</);

    if (renderAsComponent && !isInline) {
      throw new Error('Code using `render()` cannot use top level hooks. ' + 'Either provide your own stateful component, or return a jsx element directly.');
    }

    const result = (0, _transpile.default)(ast || code, {
      inline: isInline,
      wrapper: renderAsComponent ? wrapAsComponent : undefined
    });

    const render = element => {
      if (element === undefined) {
        reject(new SyntaxError('`render()` was called without a JSX element'));
        return;
      }

      resolve(element);
    }; // const [clearTimes, timers] = createTimers();
    // DU NA NA NAAAH


    const finalScope = _objectSpread(_objectSpread({}, hooks), scope);

    const args = ['React', 'render'].concat(Object.keys(finalScope));
    const values = [_react.default, render].concat(Object.values(finalScope));
    let body = result.code;
    if (preample) body = `${preample}\n\n${body}`; // eslint-disable-next-line no-new-func

    const fn = new Function(...args, body);
    let element;

    try {
      element = fn(...values);
    } catch (err) {
      reject(handleError(err, result, fn));
      return;
    }

    if (!isInline) return;

    if (element === undefined) {
      reject(new SyntaxError('The code did not return a JSX element'));
      return;
    }

    if (! /*#__PURE__*/(0, _react.isValidElement)(element)) {
      if ((0, _reactIs.isValidElementType)(element)) {
        element = /*#__PURE__*/(0, _react.createElement)(element);
      } else {
        reject(new SyntaxError('The code did not return a valid React element or element type'));
      }
    }

    resolve(element);
  });
}

function useLiveContext() {
  return (0, _react.useContext)(Context);
}

function useElement() {
  return useLiveContext().element;
}

function useError() {
  return useLiveContext().error;
}

const objectZip = (arr, arr2) => Object.fromEntries(arr.map((v, i) => [v, arr2[i]]));

exports.objectZip = objectZip;

function defaultResolveImports(sources) {
  // @ts-ignore
  return Promise.all(sources.map((s) => import(/* webpackIgnore: true */ /* @vite-ignore */ s)));
}

function useNormalizedCode(code, showImports, setError) {
  return (0, _react.useMemo)(() => {
    const nextCode = code.replace(prettierComment, '').trim();
    if (showImports) return [nextCode, [], ''];

    try {
      const result = (0, _transpile.parseImports)(nextCode, true);
      return [result.code, result.imports, result.imports.map(i => i.code).join('\n').trimStart()];
    } catch (err) {
      setError(err);
      return [code, [], ''];
    }
  }, [code, showImports]);
}
/**
 * The Provider supplies the context to the other components as well as handling
 * jsx transpilation and import resolution.
 */


function Provider({
  scope,
  children,
  code: rawCode,
  language,
  theme,
  showImports = true,
  renderAsComponent = false,
  resolveImports = defaultResolveImports
}) {
  const isMounted = (0, _useMounted.default)();
  const [error, setError] = (0, _react.useState)(null);
  const [{
    element
  }, setState] = (0, _react.useState)({
    element: null
  });
  const [cleanCode, ogImports, ogImportBlock] = useNormalizedCode(rawCode, showImports, setError);
  const handleChange = (0, _useEventCallback.default)(nextCode => {
    try {
      const {
        ast,
        imports
      } = (0, _transpile.parseImports)(nextCode, false);
      const sources = Array.from(new Set([...ogImports, ...imports].map(i => i.source)));
      Promise.resolve(resolveImports(sources)).then(results => Array.isArray(results) ? objectZip(sources, results) : results).then(fetchedImports => codeToComponent(nextCode, {
        ast,
        renderAsComponent,
        // also include the orginal imports if they were removed
        preample: ogImportBlock,
        scope: _objectSpread(_objectSpread({}, scope), {}, {
          require: getRequire(fetchedImports)
        })
      })).then(element => {
        if (!isMounted()) return;
        setState({
          element
        });
        setError(null);
      }, err => {
        if (!isMounted()) return;
        setError(err);
      });
    } catch (err) {
      setError(err);
    }
  });
  (0, _react.useEffect)(() => {
    handleChange(cleanCode);
  }, [cleanCode, scope, handleChange]);
  const context = (0, _react.useMemo)(() => ({
    theme,
    error,
    element,
    language,
    code: cleanCode,
    onError: setError,
    onChange: handleChange
  }), [cleanCode, element, error, handleChange, language, theme]);
  return /*#__PURE__*/_react.default.createElement(Context.Provider, {
    value: context
  }, children);
}