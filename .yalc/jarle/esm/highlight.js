import { Prism } from 'prism-react-renderer';
export default ((code, language) => {
  const grammar = language && Prism.languages[language];
  return grammar ? Prism.highlight(code, grammar, language) : code;
});