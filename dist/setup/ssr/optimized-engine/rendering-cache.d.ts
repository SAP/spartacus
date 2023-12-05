import { SsrOptimizationOptions } from './ssr-optimization-options';
export interface RenderingEntry {
    html?: any;
    err?: any;
    time?: number;
    rendering?: boolean;
}
export declare class RenderingCache {
    private options?;
    protected renders: Map<string, RenderingEntry>;
    constructor(options?: SsrOptimizationOptions | undefined);
    setAsRendering(key: string): void;
    isRendering(key: string): boolean;
    store(key: string, err?: Error | null, html?: string): void;
    get(key: string): RenderingEntry | undefined;
    clear(key: string): void;
    isReady(key: string): boolean;
    isFresh(key: string): boolean;
}
