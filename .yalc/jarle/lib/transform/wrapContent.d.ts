import type MagicString from 'magic-string';
import type { Node, Plugin } from './types';
export declare type Wrapper = (ctx: MagicString, node: Node) => void;
export declare type Options = {
    wrapper: Wrapper;
};
declare const _default: ({ wrapper }: Options) => Plugin;
export default _default;
