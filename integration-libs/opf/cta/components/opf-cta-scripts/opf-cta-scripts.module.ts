/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { OpfCtaScriptsComponent } from './opf-cta-scripts.component';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';

@NgModule({
  declarations: [OpfCtaScriptsComponent],
  providers: [
    OpfCtaScriptsService,
    OpfDynamicCtaService,
    OpfStaticCtaService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfCtaScriptsComponent: {
          component: OpfCtaScriptsComponent,
        },
      },
    }),
  ],
  exports: [OpfCtaScriptsComponent],
  imports: [CommonModule, OpfCtaElementModule],
})
export class OpfCtaScriptsModule {}
