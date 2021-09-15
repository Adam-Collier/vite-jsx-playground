"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = transform;

var _acorn = require("acorn");

var _acornJsx = _interopRequireDefault(require("acorn-jsx"));

var _magicString = _interopRequireDefault(require("magic-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-restricted-syntax */
const parser = _acorn.Parser.extend((0, _acornJsx.default)());

const isNode = n => n !== null && typeof n.type === 'string';

const nodeExists = (n, parent, key) => {
  if (!parent) return true;
  if (!(key in parent)) return false;
  let value = parent[key];
  return Array.isArray(value) ? value.includes(n) : value === n;
};

function walk(ctx, visitors, node, parent, key) {
  if (!node) return;
  const visitor = visitors[node.type];
  visitor === null || visitor === void 0 ? void 0 : visitor.forEach(v => {
    var _v$enter;

    return (_v$enter = v.enter) === null || _v$enter === void 0 ? void 0 : _v$enter.call(ctx, node, parent, key);
  });

  if (!nodeExists(node, parent, key)) {
    return false;
  } // eslint-disable-next-line guard-for-in


  for (const _key in node) {
    const value = node[_key];

    if (isNode(value)) {
      walk(ctx, visitors, value, node, _key);
    } //
    else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i += 1) {
          if (isNode(value[i])) {
            if (walk(ctx, visitors, value[i], node, _key) === false) {
              i--;
            }
          }
        }
      }
  }

  visitor === null || visitor === void 0 ? void 0 : visitor.forEach(v => {
    var _v$leave;

    return (_v$leave = v.leave) === null || _v$leave === void 0 ? void 0 : _v$leave.call(ctx, node, parent, key);
  });
}

const mergeVisitors = visitors => {
  const rootVisitor = {};

  for (const visitor of visitors) {
    for (const key of Object.keys(visitor)) {
      const value = visitor[key];

      for (const type of key.split('|')) {
        const normalized = typeof value === 'function' ? {
          enter: value
        } : value;
        rootVisitor[type] = rootVisitor[type] || [];
        rootVisitor[type].push(normalized);
      }
    }
  }

  return rootVisitor;
};

function transform(source, options = {
  plugins: []
}) {
  const {
    plugins
  } = options;
  let code;
  let ast;

  if (typeof source === 'string') {
    code = new _magicString.default(source);
    ast = parser.parse(source, {
      ecmaVersion: 10,
      preserveParens: true,
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
      allowReturnOutsideFunction: true,
      allowHashBang: true,
      onComment: (...args) => {
        plugins.forEach(p => {
          var _p$onComment;

          return (_p$onComment = p.onComment) === null || _p$onComment === void 0 ? void 0 : _p$onComment.call(p, ...args);
        });
      }
    });
    ast.magicString = code;
  } else {
    code = source.magicString;
    ast = source;
  }

  walk(code, mergeVisitors(plugins.map(p => p.visitor).filter(Boolean)), ast);
  return {
    ast,
    code: code.toString(),
    map: code.generateMap({
      file: options.file,
      source: options.source,
      includeContent: options.includeContent !== false
    })
  };
}