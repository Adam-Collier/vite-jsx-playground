import { transform } from './transform';
import jsx from './transform/jsx';
import modules from './transform/modules';
import wrapContent from './transform/wrapContent';
import wrapLastExpression from './transform/wrapLastExpression';

const truthy = value => !!value;

export function parseImports(input, remove) {
  const imports = [];
  const {
    code,
    map,
    ast
  } = transform(input, {
    file: 'compiled.js',
    source: 'example.js',
    plugins: [modules({
      remove,
      imports
    })]
  });
  return {
    code,
    ast,
    imports,
    map
  };
}
export default ((input, {
  inline: _inline = false,
  wrapper
} = {}) => {
  const imports = [];
  const {
    code,
    ast,
    map
  } = transform(input, {
    file: 'compiled.js',
    source: 'example.js',
    plugins: [jsx(), modules(), _inline && wrapLastExpression(), wrapper && wrapContent({
      wrapper
    })].filter(truthy)
  });
  return {
    code,
    ast,
    imports,
    map
  };
});