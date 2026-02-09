/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OccOpfGiftCardAdapter } from './adapters';
import { OpfGiftCardAdapter } from '../core/connectors';
@NgModule({
  providers: [
    {
      provide: OpfGiftCardAdapter,
      useClass: OccOpfGiftCardAdapter,
    },
  ],
})
export class OpfGiftCardOccModule {}
