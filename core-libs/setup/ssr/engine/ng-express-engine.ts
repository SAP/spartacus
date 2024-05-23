/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StaticProvider } from '@angular/core';
import {
  CommonEngine,
  CommonEngineOptions,
  CommonEngineRenderOptions,
} from '@angular/ssr';
import { Request, Response } from 'express';
import { REQUEST, RESPONSE } from '../tokens/express.tokens';

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/src/main.ts
 */
export type NgSetupOptions = Pick<
  CommonEngineRenderOptions,
  'providers' | 'publicPath' | 'inlineCriticalCss'
> &
  CommonEngineOptions;

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/src/main.ts
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

/**
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/src/main.ts
 */
export interface RenderOptions extends CommonEngineRenderOptions {
  req: Request;
  res?: Response;
}

/**
 * This is an express engine for handling Angular Applications
 *
 * Function `ngExpressEngine` was originally present in Angular for a long time and was removed in version Angular 17.
 * However, it is needed in Spartacus for backward compatibility reasons.
 * Therefore, we have copied the code from the Angular repository and included it in our Spartacus repository to avoid larger refactors.
 *
 * @license
 * The MIT License
 * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
 *
 * See:
 * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/src/main.ts
 */
export function ngExpressEngine(setupOptions: NgSetupOptions) {
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
      const renderOptions = { ...options } as RenderOptions;
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
