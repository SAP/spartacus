/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfAddToCartModule } from './opf-add-to-cart/opf-add-to-cart.module';
import { OpfCtaScriptsModule } from './opf-cta/opf-cta-scripts/opf-cta-scripts.module';
import { OpfErrorModalModule } from './opf-error-modal/opf-error-modal.module';
import { OpfQuickBuyModule } from './opf-quick-buy/opf-quick-buy.module';

@NgModule({
  imports: [
    OpfErrorModalModule,
    OpfCtaScriptsModule,
    OpfQuickBuyModule,
    OpfAddToCartModule,
  ],
  providers: [],
})
export class OpfBaseComponentsModule {}
