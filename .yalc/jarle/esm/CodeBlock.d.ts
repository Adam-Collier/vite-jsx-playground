import { Language, PrismTheme } from 'prism-react-renderer';
import { LineOutputProps } from './prism';
declare type MapTokens = Omit<LineOutputProps, 'props'> & {
    hasTheme?: boolean;
    lineNumbers?: boolean;
    errorLocation?: {
        line: number;
        col: number;
    };
};
export declare const mapTokens: ({ tokens, getLineProps, getTokenProps, errorLocation, }: MapTokens) => JSX.Element;
interface Props {
    className?: string;
    style?: any;
    theme?: PrismTheme;
    code: string;
    language: Language;
    lineNumbers?: boolean;
}
declare function CodeBlock({ code, theme, language, lineNumbers, ...props }: Props): JSX.Element;
export default CodeBlock;
