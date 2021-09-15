import React from 'react';
import { useError } from './Provider';
/**
 * Displays an sytax or runtime error that occured when rendering the code
 *
 */

export default function Error(props) {
  const error = useError();
  return error ? /*#__PURE__*/React.createElement("pre", props, error.toString()) : null;
}