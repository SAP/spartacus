/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCtaElementModule } from './opf-cta-element';
import { OpfCtaQuickBuyButtonsModule } from './opf-cta-quick-buy-buttons';
import { OpfCtaScriptsModule } from './opf-cta-scripts';

@NgModule({
  imports: [
    OpfCtaScriptsModule,
    OpfCtaElementModule,
    OpfCtaQuickBuyButtonsModule,
  ],
  providers: [],
})
export class OpfCtaComponentsModule {}
