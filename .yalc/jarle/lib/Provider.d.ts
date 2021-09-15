import { PrismTheme } from 'prism-react-renderer';
import React, { ReactNode } from 'react';
export declare type LiveError = Error & {
    location?: {
        line: number;
        col: number;
    };
};
export interface LiveContext {
    code?: string;
    language?: string;
    theme?: PrismTheme;
    disabled?: boolean;
    error: LiveError | null;
    element: JSX.Element | null;
    onChange(code: string): void;
    onError(error: Error): void;
}
export declare const Context: React.Context<LiveContext>;
export declare type ImportResolver = (requests: string[]) => Promise<Record<string, any> | any[]>;
export interface Props<TScope> {
    /**
     * A string of code to render
     */
    code: string;
    /** A context object of values automatically available for use in editor code */
    scope?: TScope;
    /** Render subcomponents */
    children?: ReactNode;
    /** A Prism language string for selecting a grammar for syntax highlighting */
    language?: string;
    /** A Prism theme object, leave empty to not use a theme or use a traditional CSS theme. */
    theme?: PrismTheme;
    /** Whether the import statements in the initial `code` text are shown to the user or not. */
    showImports?: boolean;
    /**
     * Creates a react component using the code text as it's body. This allows
     * using top level hooks in your example without having to create and return your
     * own component. Cannot be used with `render()` in the example.
     *
     * ```jsx
     * import Button from './Button'
     *
     * const [active, setActive] = useState()
     *
     * <Button active={active} onClick={() => setActive(true)}/>
     * ```
     */
    renderAsComponent?: boolean;
    /**
     * A function that maps an array of import requests to modules, may return a promise.
     *
     * ```ts
     * const resolveImports = (requests) =>
     *   Promise.all(requests.map(req => import(req)))
     * ```
     *
     * Or an object hash of import requests to the result
     *
     * ```ts
     * const resolveImports = () => ({
     *   './foo': Foo
     * })
     * ```
     *
     */
    resolveImports?: ImportResolver;
}
export declare function useLiveContext(): LiveContext;
export declare function useElement(): JSX.Element | null;
export declare function useError(): LiveError | null;
export declare const objectZip: <T extends PropertyKey, U>(arr: T[], arr2: U[]) => Record<string, U>;
/**
 * The Provider supplies the context to the other components as well as handling
 * jsx transpilation and import resolution.
 */
export default function Provider<TScope extends {} = {}>({ scope, children, code: rawCode, language, theme, showImports, renderAsComponent, resolveImports, }: Props<TScope>): JSX.Element;
