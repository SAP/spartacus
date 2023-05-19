/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServer } from '@spartacus/setup/ssr';
import { StorefrontComponent } from '@spartacus/storefront';
import { AppModule } from './app.module';
import {
  throwOups,
  writeStateToFile,
} from './custom/handlers/server-error-handlers';
import { provideErrorHandlers } from './custom/providers/provide-error-handlers';

// @Injectable()
// export class LogInterceptor implements HttpInterceptor {
//   intercept(req: any, next: any) {
//     return next.handle(req);

//     // spike todo remove:
//     console.log(req.url, 'intercepted');
//     return next.handle(req).pipe(
//       tap(
//         () => console.log(req.url, 'succeeded'),
//         () => console.log(req.url, 'failed')
//       )
//     );
//   }
// }

// @NgModule({
//   providers: [
//     { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
//   ],
// })
// export class InterceptorModule {}

@NgModule({
  imports: [
    // InterceptorModule,
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent],
  providers: [
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
    provideErrorHandlers([writeStateToFile, throwOups]),

    // ...provideLateErrorPropagator,
  ],
})
export class AppServerModule {}
