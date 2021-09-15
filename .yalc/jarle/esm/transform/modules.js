/* eslint-disable no-param-reassign */
export default (({
  remove,
  fn: _fn = 'require',
  imports: _imports = []
} = {}) => {
  let num = 0;

  const getIdentifier = src => `${src.split('/').pop().replace(/\W/g, '_')}$${num++}`;

  return {
    visitor: {
      Program: {
        leave() {
          if (_imports.length && remove) this.trimLines();
        }

      },

      ImportDeclaration(node, parent, key) {
        if (!node.source) return;
        const {
          source: {
            value
          },
          start,
          end
        } = node;
        const details = {
          base: null,
          source: value,
          keys: [],
          code: ''
        };
        const named = [];
        const req = `${_fn}('${value}');`;
        const tmp = getIdentifier(value);
        node.specifiers.forEach(({
          type,
          local,
          imported
        }) => {
          if (type === 'ImportSpecifier') {
            const key = {
              local: local.name,
              imported: imported.name
            };
            details.keys.push(key);
            named.push(key.local === key.imported ? key.local : `${key.imported}: ${key.local}`);
          } else {
            details.base = local.name;
            details.code += `var ${tmp} = ${req}\nvar ${local.name} = ${tmp}.default || ${tmp};\n`;
          }
        });

        if (named.length) {
          details.code += `var { ${named.join(', ')} } = ${details.code ? `${tmp};` : req}`;
        }

        details.code = details.code.trim() || req;

        _imports.push(details);

        if (remove) {
          parent[key].splice(parent[key].indexOf(node), 1);
          this.remove(start, end);
          return;
        }

        this.overwrite(start, end, details.code);
      }

    }
  };
});