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
import { BaseServerModule, TransferServerErrors } from '@spartacus/setup';
import { StorefrontComponent } from '@spartacus/storefront';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    // BaseServerModule should be imported as the first, because it provides
    // an interceptor that should be the first in the chain (that is meant to catch all http errors).
    BaseServerModule.forRoot(),

    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent],

  providers: [
    // SPIKE TODO: move this provider to a BaseServerModule
    {
      provide: BEFORE_APP_SERIALIZED,
      // useFactory: () => () => console.log('BEFORE_APP_SERIALIZED'),

      useFactory: () => {
        const transferServerErrors = inject(TransferServerErrors);
        return () => transferServerErrors.transferErrors();
      },
      multi: true,
    },
  ],
})
export class AppServerModule {}
