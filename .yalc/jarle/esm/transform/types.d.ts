import type { Position, Node as AcornNode } from 'acorn';
import type MagicString from 'magic-string';
export declare type Node = AcornNode & {
    [other: string]: any;
};
export declare type VisitorFn = <TNode extends Node = any>(this: MagicString, node: TNode, parent: Node, key: string) => void;
export declare type NormalVisitor = {
    enter?: VisitorFn;
    leave?: VisitorFn;
};
export declare type Visitor = VisitorFn | NormalVisitor;
export declare type PluginOptions = {};
export declare type VisitorMap = Record<string, Visitor>;
export declare type Plugin = {
    onComment?: (isBlock: boolean, text: string, start: number, end: number, startLoc?: Position, endLoc?: Position) => void;
    visitor?: VisitorMap;
};
