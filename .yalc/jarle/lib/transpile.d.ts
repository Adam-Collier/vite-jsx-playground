import { Root } from './transform';
import { Import } from './transform/modules';
import { Wrapper } from './transform/wrapContent';
export declare function parseImports(input: string | Root, remove: boolean): {
    code: string;
    ast: Root;
    imports: Import[];
    map: import("magic-string").SourceMap;
};
export declare type Options = {
    inline?: boolean;
    wrapper?: Wrapper;
};
declare const _default: (input: string | Root, { inline, wrapper }?: Options) => {
    code: string;
    ast: Root;
    imports: Import[];
    map: import("magic-string").SourceMap;
};
export default _default;
