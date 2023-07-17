/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OpfCheckoutProgressComponent } from './opf-checkout-progress.component';

@NgModule({
  declarations: [OpfCheckoutProgressComponent],
  exports: [OpfCheckoutProgressComponent],
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfCheckoutProgressComponent: {
          component: OpfCheckoutProgressComponent,
        },
      },
    }),
  ],
})
export class OpfCheckoutProgressModule {}
