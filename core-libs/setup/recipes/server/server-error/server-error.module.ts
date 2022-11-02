/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SERVER_ERROR_COLLECTOR } from './server-error-collector';
import { ServerHttpErrorInterceptor } from './server-http-error.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ServerHttpErrorInterceptor,
      multi: true,
    },
    {
      provide: SERVER_ERROR_COLLECTOR,
      useExisting: ServerHttpErrorInterceptor,
      multi: true,
    },
    // SPIKE TODO: change it to BEFORE_APP_SERIALIZED (from @angular/platform-server)
    // when this module will be imported only in the server app (as it cannot be imported in the browser app)

    // SPIKE TODO: REMOVE:
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (injector: Injector) => () => {
    //     // don't return, as it would block the bootstrap of the app
    //     injector
    //       .get(ApplicationRef)
    //       .isStable.pipe(first((isStable) => isStable))
    //       .toPromise()
    //       .then(() => {
    //         injector.get(SsrErrorHandlerService).handleErrors();
    //       });
    //   },
    //   multi: true,
    //   deps: [Injector],
    // },
  ],
})
export class ServerErrorModule {}
