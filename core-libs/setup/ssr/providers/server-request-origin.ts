/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject } from '@angular/core';
import { SERVER_REQUEST_ORIGIN } from '@spartacus/core';
import { ServerOptions } from './model';

/**
 * Returns a factory function which resolves the server request origin.
 */
export function serverRequestOriginFactory(options?: ServerOptions): Function {
  return (): string => {
    const serverRequestOrigin = inject(SERVER_REQUEST_ORIGIN, {
      optional: true,
      skipSelf: true,
    });

    // usually prerendering mode, but can be SSR
    if (options?.serverRequestOrigin) {
      return options.serverRequestOrigin;
    }

    // SSR mode, from express engine
    if (serverRequestOrigin) {
      return serverRequestOrigin;
    }

    throw new Error(
      `The request origin is not set. 
    If you are using the default environment variable, please specify it when initiating the process.
    
    E.g.
    > SERVER_REQUEST_ORIGIN=https://my.domain.com yarn prerender
    > SERVER_REQUEST_ORIGIN=http://localhost:4200 yarn serve:ssr
    
    
    Alternatively, you can pass it as an argument to provideServer
    function, but beware it will be used for server-side rendering as well.
    
    E.g.
    @NgModule({
      // ...
      providers: [
        provideServer({
          serverRequestOrigin: 'https://my.domain.com',
        }),
      ],
    })
    export class AppServerModule {}`
    );
  };
}
