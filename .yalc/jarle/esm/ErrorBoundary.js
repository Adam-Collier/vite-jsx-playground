import React from 'react';
import { Context } from './Provider';

class CodeLiveErrorBoundary extends React.Component {
  componentDidCatch(error) {
    this.context.onError(error);
  }

  render() {
    const {
      element: Element
    } = this.props;
    return typeof Element === 'function' ? /*#__PURE__*/React.createElement(Element, null) : Element;
  }

}

CodeLiveErrorBoundary.contextType = Context;
export default CodeLiveErrorBoundary;