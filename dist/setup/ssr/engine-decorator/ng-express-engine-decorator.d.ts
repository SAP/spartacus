import { NgSetupOptions } from '@nguniversal/express-engine';
import { SsrCallbackFn } from '../optimized-engine/optimized-ssr-engine';
import { SsrOptimizationOptions } from '../optimized-engine/ssr-optimization-options';
export type NgExpressEngineInstance = (filePath: string, options: object, callback: SsrCallbackFn) => void;
export type NgExpressEngine = (setupOptions: Readonly<NgSetupOptions>) => NgExpressEngineInstance;
/**
 * The wrapper over the standard ngExpressEngine, that provides tokens for Spartacus
 * @param ngExpressEngine
 */
export declare class NgExpressEngineDecorator {
    /**
     * Returns the higher order ngExpressEngine with provided tokens for Spartacus
     *
     * @param ngExpressEngine
     */
    static get(ngExpressEngine: NgExpressEngine, optimizationOptions?: SsrOptimizationOptions | null): NgExpressEngine;
}
export declare function decorateExpressEngine(ngExpressEngine: NgExpressEngine, optimizationOptions?: SsrOptimizationOptions | null | undefined): NgExpressEngine;
