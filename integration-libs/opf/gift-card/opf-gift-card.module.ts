/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfGiftCardCoreModule } from '@spartacus/opf/gift-card/core';
import { OpfGiftCardOccModule } from '@spartacus/opf/gift-card/occ';

@NgModule({
  imports: [OpfGiftCardCoreModule, OpfGiftCardOccModule],
})
export class OpfGiftCardModule {}
