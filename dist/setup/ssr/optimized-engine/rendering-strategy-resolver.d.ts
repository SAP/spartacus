import { Request } from 'express';
import { RenderingStrategy } from './ssr-optimization-options';
import { RenderingStrategyResolverOptions } from './rendering-strategy-resolver-options';
/**
 * Creates a rendering strategy resolver function with the specified options.
 *
 * @function
 * @param  options - The options to configure the rendering strategy resolver.
 * @param [options.excludedUrls] - An optional array of URLs for which server-side rendering (SSR) should be disabled.
 * @param [options.excludedParams] - An optional array of Query parameters for which SSR should be disabled.
 * @returns A rendering strategy resolver function that takes a Request object
 * as a parameter and returns the rendering strategy to be applied for the request, which can be either
 * `RenderingStrategy.ALWAYS_CSR` or `RenderingStrategy.DEFAULT`.
 */
export declare const defaultRenderingStrategyResolver: (options: RenderingStrategyResolverOptions) => (request: Request) => RenderingStrategy;
