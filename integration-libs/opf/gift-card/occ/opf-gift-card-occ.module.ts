/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ConfigModule } from '@spartacus/core';
import { NgModule } from '@angular/core';
import { OccOpfGiftCardAdapter } from './adapters';
import { OpfGiftCardAdapter } from '../core/connectors';
import { defaultGiftCardCartOccEndpointsConfig } from './config';
@NgModule({
  imports: [ConfigModule.withConfig(defaultGiftCardCartOccEndpointsConfig)],

  providers: [
    {
      provide: OpfGiftCardAdapter,
      useClass: OccOpfGiftCardAdapter,
    },
  ],
})
export class OpfGiftCardOccModule {}
