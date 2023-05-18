/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { MODULE_INITIALIZER } from '@spartacus/core';
import {
  OpfCheckoutConnector,
  OpfOrderConnector,
  OtpConnector,
} from './connectors';
import { OpfEventModule } from './events/opf-event.module';
import { facadeProviders } from './facade/facade-providers';
import { OpfStatePersistenceService } from './services/opf-state-persistence.service';
import { OpfStoreModule } from './store/opf-store.module';

export function opfStatePersistenceFactory(
  opfStatePersistenceService: OpfStatePersistenceService
): () => void {
  return () => opfStatePersistenceService.initSync();
}

@NgModule({
  imports: [OpfStoreModule, OpfEventModule],
  providers: [
    {
      provide: MODULE_INITIALIZER,
      useFactory: opfStatePersistenceFactory,
      deps: [OpfStatePersistenceService],
      multi: true,
    },
    ...facadeProviders,
    OpfCheckoutConnector,
    OtpConnector,
    OpfOrderConnector,
  ],
})
export class OpfPaymentCoreModule {}
