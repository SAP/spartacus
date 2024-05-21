/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfCtaElementModule } from '../opf-cta-element';
import { OpfCtaScriptsComponent } from './opf-cta-scripts.component';

@NgModule({
  declarations: [OpfCtaScriptsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
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
