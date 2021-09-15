import { PrismTheme } from 'prism-react-renderer';
import React from 'react';
export interface Props {
    className?: string;
    style?: any;
    /** A Prism theme object, can also be specified on the Provider */
    theme?: PrismTheme;
    /** Render line numbers */
    lineNumbers?: boolean;
    /** Styles the info component so that it is not visible but still accessible by screen readers. */
    infoSrOnly?: boolean;
    /** The component used to render A11y messages about keyboard navigation, override to customize the styling */
    infoComponent?: React.ComponentType<any>;
}
/**
 * The Editor is the code text editor component, some props can be supplied directly
 * or take from the Provider context if available.
 */
declare const Editor: React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>;
export default Editor;
