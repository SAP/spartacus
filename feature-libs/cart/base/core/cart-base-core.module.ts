/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CartPersistenceModule } from './cart-persistence.module';
import { CartConnector } from './connectors/cart/cart.connector';
import { CartEntryConnector } from './connectors/entry/cart-entry.connector';
import { CartValidationConnector } from './connectors/validation/cart-validation.connector';
import { CartVoucherConnector } from './connectors/voucher/cart-voucher.connector';
import { CartEventModule } from './event/cart-event.module';
import { CartPageEventModule } from './event/cart-page-event.module';
import { facadeProviders } from './facade/facade-providers';
import { BadCartRequestHandler } from './http-interceptors/handlers/bad-cart-request.handler';
import { BadVoucherRequestHandler } from './http-interceptors/handlers/bad-voucher-request.handler';
import { MultiCartStoreModule } from './store/multi-cart-store.module';

@NgModule({
  imports: [
    CartEventModule,
    MultiCartStoreModule,
    CartPersistenceModule,
    CartPageEventModule,
  ],
  providers: [
    CartConnector,
    CartEntryConnector,
    CartVoucherConnector,
    CartValidationConnector,
    ...facadeProviders,
    {
      provide: HttpErrorHandler,
      useExisting: BadCartRequestHandler,
      multi: true,
    },
    {
      provide: HttpErrorHandler,
      useExisting: BadVoucherRequestHandler,
      multi: true,
    },
  ],
})
export class CartBaseCoreModule {}
