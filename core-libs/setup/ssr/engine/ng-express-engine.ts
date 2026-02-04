/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AngularNodeAppEngine,
  CommonEngineOptions,
  CommonEngineRenderOptions,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { Request, Response } from 'express';

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

// SPIKE - CAUTION 1 - removed providers of REQUEST and RESPONSE as there is no way to provide them via AngularNodeAppEngine.handle()
//                       As a result, we'll need to use Angular's new DI tokens REQUEST and RESPONSE_INIT from @angular/core
//         CAUTION 2 - now I expect some Spartacus features to be not working properly (those based in REQUEST/RESPONSE)
//                       but please mind I've run dev server with env variable SERVER_REQUEST_ORIGIN, so perhaps it satisfies Spartacus needs
//
//
//   /**
//  * @license
//  * The MIT License
//  * Copyright (c) 2010-2023 Google LLC. http://angular.io/license
//  *
//  * See:
//  * - https://github.com/angular/universal/blob/e798d256de5e4377b704e63d993dc56ea35df97d/modules/express-engine/src/main.ts
//  */
// function getReqResProviders(req: Request, res?: Response): StaticProvider[] {
//   const providers: StaticProvider[] = [
//     {
//       provide: REQUEST,
//       useValue: req,
//     },
//   ];
//   if (res) {
//     providers.push({
//       provide: RESPONSE,
//       useValue: res,
//     });
//   }

//   return providers;
// }

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
export function ngExpressEngine(
  // SPIKE - PERHAPS we need a way to pass options like `inlineCriticalCss`, etc. in case of AngularNodeAppEngine
  _setupOptions: NgSetupOptions
) {
  const angularApp = new AngularNodeAppEngine();

  return function (
    _filePath: string,
    options: object, // SPIKE - necessary properties: req, res
    // SPIKE - I guess this callback is not needed (in server.ts it's nearly empty besides calling next(err)). but lets leave it for now
    callback: (err?: Error | null, html?: string) => void
  ) {
    try {
      const renderOptions = { ...options } as RenderOptions;

      const { req } = renderOptions;
      const res = renderOptions.res ?? req.res;

      if (!res) {
        throw new Error('Response object is required');
      }

      angularApp
        .handle(req)
        .then((response) => {
          if (response) {
            writeResponseToNodeResponse(response, res);
            callback(null, '');
          } else {
            callback(new Error('No response from AngularNodeAppEngine')); // it will be passed in server.ts to next()
          }
        })
        .catch(callback);
    } catch (err) {
      err instanceof Error && callback(err);
    }
  };
}
