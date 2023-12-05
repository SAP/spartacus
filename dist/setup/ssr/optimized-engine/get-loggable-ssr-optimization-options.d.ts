import { SsrOptimizationOptions } from './ssr-optimization-options';
/**
 * Helper function that maps optimization options to primitive values.
 * This is useful for logging and monitoring purposes.
 *
 * @param value optimization options that should be logged
 * @returns options containing only primitive values that are easier to read by developers and monitoring tools
 */
export declare const getLoggableSsrOptimizationOptions: (value: SsrOptimizationOptions) => Record<string, any>;
