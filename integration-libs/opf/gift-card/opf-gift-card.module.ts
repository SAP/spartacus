/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfGiftCardComponentsModule } from './components/opf-gift-card-components.module';
import { OpfGiftCardCoreModule } from '@spartacus/opf/gift-card/core';
import { OpfGiftCardOccModule } from '@spartacus/opf/gift-card/occ';
import { OpfGiftCardRootModule } from './root/opf-gift-card-root.module';

@NgModule({
  imports: [
    OpfGiftCardComponentsModule,
    OpfGiftCardCoreModule,
    OpfGiftCardOccModule,
    OpfGiftCardRootModule,
  ],
})
export class OpfGiftCardModule {}
