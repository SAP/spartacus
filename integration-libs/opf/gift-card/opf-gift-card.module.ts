/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
// import { OpfGiftCardComponentsModule } from './components/public_api';
import { OpfGiftCardCoreModule } from '@spartacus/opf/gift-card/core';
import { OpfGiftCardOccModule } from './occ/opf-gift-card-occ.module';

@NgModule({
  imports: [
    // OpfGiftCardComponentsModule,
    OpfGiftCardCoreModule,
    OpfGiftCardOccModule,
  ],
})
export class OpfGiftCardModule {}
