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
import { OpfCtaButtonModule } from '../opf-cta-button/opf-cta-button.module';
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
  imports: [CommonModule, OpfCtaButtonModule, SpinnerModule],
})
export class OpfCtaScriptsModule {}
