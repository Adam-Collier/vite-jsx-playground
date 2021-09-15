import React, { Component } from 'react';

export const errorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends Component {
    componentDidCatch(error) {
      console.log('component did catch', error);
      errorCallback(error);
    }

      render() {
      return typeof Element === 'function' ? <Element /> : Element;
    }
  };
};