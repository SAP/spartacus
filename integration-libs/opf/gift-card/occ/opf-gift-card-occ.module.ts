/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OccOpfGiftCardAdapter } from './adapters';
import { OpfGiftCardAdapter } from '@spartacus/opf/gift-card/core';
import { defaultGiftCardOccEndpointsConfig } from './config/default-occ-opf-gift-card-config';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    {
      provide: OpfGiftCardAdapter,
      useClass: OccOpfGiftCardAdapter,
    },
    provideDefaultConfig(defaultGiftCardOccEndpointsConfig),
  ],
})
export class OpfGiftCardOccModule {}
