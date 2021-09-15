import type { Plugin } from './types';
export declare type Import = {
    code: string;
    source: string;
    base: null | string;
    keys: Array<{
        local: string;
        imported: string;
    }>;
};
export interface Options {
    remove?: boolean;
    fn?: string;
    imports?: Import[];
}
declare const _default: ({ remove, fn, imports, }?: Options) => Plugin;
export default _default;
