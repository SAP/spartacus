/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { PunchoutErrorComponent } from './punchout-error/punchout-error.component';
import { PunchoutSessionComponent } from './punchout-session/punchout-session.component';

@NgModule({
  declarations: [PunchoutSessionComponent, PunchoutErrorComponent],
  exports: [PunchoutSessionComponent, PunchoutErrorComponent],
  imports: [],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        PunchoutSessionComponent: {
          component: PunchoutSessionComponent,
        },
        PunchoutErrorComponent: {
          component: PunchoutErrorComponent,
        },
      },
    }),
  ],
})
export class PunchoutComponentsModule {}
