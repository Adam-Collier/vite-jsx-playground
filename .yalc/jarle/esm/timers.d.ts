export default function createTimers(): readonly [() => void, {
    readonly setTimeout: (...args: any[]) => any;
    readonly clearTimeout: (id: any) => void;
    readonly setInterval: (...args: any[]) => any;
    readonly clearInterval: (id: any) => void;
    readonly requestAnimationFrame: (...args: any[]) => any;
    readonly cancelAnimationFrame: (id: any) => void;
}];
