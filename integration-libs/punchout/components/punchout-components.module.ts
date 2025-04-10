/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { PunchoutButtonsComponent } from './punchout-buttons/punchout-buttons.component';
import { PunchoutCloseSessionComponent } from './punchout-close-session/punchout-close-session.component';
import { PunchoutErrorComponent } from './punchout-error/punchout-error.component';
import { PunchoutRequisitionComponent } from './punchout-requisition/punchout-requisition.component';
import { PunchoutSessionComponent } from './punchout-session/punchout-session.component';

@NgModule({
  declarations: [
    PunchoutSessionComponent,
    PunchoutErrorComponent,
    PunchoutRequisitionComponent,
    PunchoutButtonsComponent,
    PunchoutCloseSessionComponent,
  ],
  exports: [
    PunchoutSessionComponent,
    PunchoutErrorComponent,
    PunchoutRequisitionComponent,
    PunchoutButtonsComponent,
    PunchoutCloseSessionComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, I18nModule],
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
      },
    }),
  ],
})
export class PunchoutComponentsModule {}
