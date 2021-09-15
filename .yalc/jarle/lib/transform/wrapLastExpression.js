"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => ({
  visitor: {
    Program: {
      leave(node) {
        const body = node.body.concat().reverse();
        let lastExpr;

        for (const _node of body) {
          switch (_node.type) {
            case 'ExpressionStatement':
            case 'ClassDeclaration':
            case 'FunctionDeclaration':
              lastExpr = lastExpr || _node;
              break;

            case 'ReturnStatement':
              return;

            case 'ExportDefaultDeclaration':
              this.overwrite(_node.start, _node.declaration.start, '');
              lastExpr = _node.declaration;
          }
        }

        if (!lastExpr) {
          return;
        }

        const {
          start,
          end
        } = lastExpr;
        const hasSemi = this.original.substring(start, end).endsWith(';');
        this.appendLeft(start, ';\nreturn (');
        if (hasSemi) this.overwrite(end - 1, end, ');');else this.appendRight(end, ');');
      }

    }
  }
});

exports.default = _default;