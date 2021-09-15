import MagicString from 'magic-string';
import { Plugin } from './types';
export interface Options {
    plugins: Plugin[];
    file?: string;
    source?: string;
    includeContent?: boolean;
}
export interface Root extends acorn.Node {
    magicString: MagicString;
}
export declare function transform(source: string | Root, options?: Options): {
    ast: Root;
    code: string;
    map: import("magic-string").SourceMap;
};
