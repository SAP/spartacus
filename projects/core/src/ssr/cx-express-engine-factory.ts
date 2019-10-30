import { NgModuleFactory, StaticProvider, Type } from '@angular/core';
import { SERVER_REQUEST_URL } from './ssr.providers';

/**
 * These are the allowed options for the engine
 */
interface NgSetupOptions {
  bootstrap: Type<{}> | NgModuleFactory<{}>;
  providers?: StaticProvider[];
}

/**
 * These are the allowed options for the render
 */
interface RenderOptions extends NgSetupOptions {
  req: any; // Request;
  res?: any; // Response;
  url?: string;
  document?: string;
}

type NgExpressEngineReturnType = (
  filePath: string,
  options: RenderOptions,
  callback: (err?: Error | null | undefined, html?: string | undefined) => void
) => void;

type NgExpressEngine = (
  setupOptions: NgSetupOptions
) => NgExpressEngineReturnType;

/**
 * The wrapper over the standard ngExpressEngine, that provides tokens for Spartacus
 * @param ngExpressEngine
 */
export function cxExpressEngineFactory(
  ngExpressEngine: NgExpressEngine
): NgExpressEngine {
  return function cxExpressEngine(
    setupOptions: NgSetupOptions
  ): NgExpressEngineReturnType {
    return (_, options, callback) => {
      const engine = ngExpressEngine({
        ...setupOptions,
        providers: [
          ...getProviders(options.req),
          ...(setupOptions.providers || []),
        ],
      });
      return engine(_, options, callback);
    };
  };
}

function getProviders(req: any): StaticProvider[] {
  return [{ provide: SERVER_REQUEST_URL, useValue: getRequestUrl(req) }];
}

function getRequestUrl(req: any): string {
  return req.protocol + '://' + req.get('host') + req.originalUrl;
}
