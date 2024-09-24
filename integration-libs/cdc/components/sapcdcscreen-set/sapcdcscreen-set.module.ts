/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SAPCDCScreenSetComponent } from './sapcdcscreen-set.component';
import { SAPCDCScreenSetService } from 'integration-libs/cdc/root/service/sapcdcscreenset-js.service';


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig >{
      cmsComponents: {
        SAPCDCScreenSetComponent: {
          component: SAPCDCScreenSetComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  providers: [
    SAPCDCScreenSetService,
  ],
  declarations: [SAPCDCScreenSetComponent ],
  exports: [SAPCDCScreenSetComponent],
})
export class SAPCDCScreenSetModule {}
