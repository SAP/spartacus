/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, NgModule } from '@angular/core';
import {
  BEFORE_APP_SERIALIZED,
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { ServerErrorHandler, SpartacusServerModule } from '@spartacus/setup';
import { StorefrontComponent } from '@spartacus/storefront';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.

    SpartacusServerModule,
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent],

  providers: [
    {
      provide: BEFORE_APP_SERIALIZED,
      // useFactory: () => () => console.log('BEFORE_APP_SERIALIZED'),

      useFactory: () => {
        const ssrErrorHandlerService = inject(ServerErrorHandler);
        return () => ssrErrorHandlerService.handleErrors();
      },
      multi: true,
    },
  ],
})
export class AppServerModule {}
