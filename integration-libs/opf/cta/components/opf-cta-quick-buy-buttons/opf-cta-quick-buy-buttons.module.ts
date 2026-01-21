/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';

import {
  OpfDynamicCtaService,
  OpfStaticCtaService,
} from '@spartacus/opf/cta/core';
import { OpfCtaElementModule } from '../opf-cta-element';
import { OpfCtaScriptsService } from '../opf-cta-scripts/opf-cta-scripts.service';
import { OpfCtaQuickBuyButtonsComponent } from './opf-cta-quick-buy-buttons.component';

@NgModule({
  declarations: [OpfCtaQuickBuyButtonsComponent],
  providers: [
    OpfCtaScriptsService,
    OpfDynamicCtaService,
    OpfStaticCtaService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfCtaQuickBuyButtons: {
          component: OpfCtaQuickBuyButtonsComponent,
        },
      },
    }),
  ],
  exports: [OpfCtaQuickBuyButtonsComponent],
  imports: [CommonModule, OpfCtaElementModule],
})
export class OpfCtaQuickBuyButtonsModule {}
