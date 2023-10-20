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
import { OpfCtaElementModule } from '../opf-cta-element';
import { OpfCtaWrapperComponent as OpfCtaScriptsComponent } from './opf-cta-scripts.component';

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
  imports: [CommonModule, OpfCtaElementModule, SpinnerModule],
})
export class OpfCtaScriptsModule {}
