/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  FeaturesConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { ApplePayModule } from '../../apple-pay/apple-pay.module';
import { OpfCtaElementModule } from '../opf-cta-element';
import { OpfCtaScriptsComponent } from './opf-cta-scripts.component';

@NgModule({
  declarations: [OpfCtaScriptsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        OpfCtaScriptsComponent: {
          component: OpfCtaScriptsComponent,
        },
      },
    }),
  ],
  exports: [OpfCtaScriptsComponent],
  imports: [CommonModule, OpfCtaElementModule, SpinnerModule, ApplePayModule],
})
export class OpfCtaScriptsModule {}
