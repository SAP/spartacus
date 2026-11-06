/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CartSharedModule } from '@spartacus/cart/base/components';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { PunchoutButtonsComponent } from './punchout-buttons/punchout-buttons.component';
import { PunchoutCloseSessionComponent } from './punchout-close-session/punchout-close-session.component';
import { PunchoutErrorComponent } from './punchout-error/punchout-error.component';
import { PunchoutInspectCartComponent } from './punchout-inspect-cart/punchout-inspect-cart.component';
import { PunchoutRequisitionComponent } from './punchout-requisition/punchout-requisition.component';
import { PunchoutSessionComponent } from './punchout-session/punchout-session.component';

@NgModule({
  exports: [
    PunchoutSessionComponent,
    PunchoutErrorComponent,
    PunchoutRequisitionComponent,
    PunchoutButtonsComponent,
    PunchoutCloseSessionComponent,
    PunchoutInspectCartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    CartSharedModule,
    IconModule,
    PunchoutSessionComponent,
    PunchoutErrorComponent,
    PunchoutRequisitionComponent,
    PunchoutButtonsComponent,
    PunchoutCloseSessionComponent,
    PunchoutInspectCartComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        PunchoutSessionComponent: {
          component: PunchoutSessionComponent,
        },
        PunchoutErrorComponent: {
          component: PunchoutErrorComponent,
        },
        PunchoutButtonsComponent: {
          component: PunchoutButtonsComponent,
        },
        PunchoutRequisitionComponent: {
          component: PunchoutRequisitionComponent,
        },
        PunchoutCloseSessionComponent: {
          component: PunchoutCloseSessionComponent,
        },
        PunchoutInspectCartComponent: {
          component: PunchoutInspectCartComponent,
        },
      },
    }),
  ],
})
export class PunchoutComponentsModule {}
