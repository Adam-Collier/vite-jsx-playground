export default (({
  wrapper
}) => ({
  visitor: {
    Program: {
      leave(node) {
        wrapper(this, node);
      }

    }
  }
}));