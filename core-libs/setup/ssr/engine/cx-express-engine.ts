import { StaticProvider } from '@angular/core';
import {
  CommonEngine,
  CommonEngineOptions,
  CommonEngineRenderOptions,
} from '@angular/ssr';
import { Request, Response } from 'express';
import { REQUEST, RESPONSE } from '../tokens/express.tokens';

export type CxSetupOptions = Readonly<
  CommonEngineRenderOptions & CommonEngineOptions
>;

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * Inspired by ngExpressEngine.
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/src/main.ts
 *
 */
function getReqResProviders(req: Request, res?: Response): StaticProvider[] {
  const providers: StaticProvider[] = [
    {
      provide: REQUEST,
      useValue: req,
    },
  ];
  if (res) {
    providers.push({
      provide: RESPONSE,
      useValue: res,
    });
  }

  return providers;
}

export interface CxRenderOptions extends CommonEngineRenderOptions {
  req: Request;
  res?: Response;
}

export function cxExpressEngine(
  setupOptions: Readonly<CommonEngineRenderOptions & CommonEngineOptions>
) {
  const engine = new CommonEngine({
    bootstrap: setupOptions.bootstrap,
    providers: setupOptions.providers,
    enablePerformanceProfiler: setupOptions.enablePerformanceProfiler,
  });

  return function (
    filePath: string,
    options: object,
    callback: (err?: Error | null, html?: string) => void
  ) {
    try {
      const renderOptions = { ...options } as CxRenderOptions;
      if (!setupOptions.bootstrap && !renderOptions.bootstrap) {
        throw new Error('You must pass in a NgModule to be bootstrapped');
      }

      const { req } = renderOptions;
      const res = renderOptions.res ?? req.res;

      renderOptions.url =
        renderOptions.url ??
        `${req.protocol}://${req.get('host') || ''}${req.baseUrl}${req.url}`;
      renderOptions.documentFilePath =
        renderOptions.documentFilePath ?? filePath;
      renderOptions.providers = [
        ...(renderOptions.providers ?? []),
        getReqResProviders(req, res),
      ];
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      renderOptions.publicPath =
        renderOptions.publicPath ??
        setupOptions.publicPath ??
        (options as any).settings?.views;
      renderOptions.inlineCriticalCss =
        renderOptions.inlineCriticalCss ?? setupOptions.inlineCriticalCss;

      engine
        .render(renderOptions)
        .then((html) => callback(null, html))
        .catch(callback);
    } catch (err) {
      err instanceof Error && callback(err);
    }
  };
}
