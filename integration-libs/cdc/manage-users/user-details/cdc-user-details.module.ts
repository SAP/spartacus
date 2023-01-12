/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CdcUserDetailsComponent } from './cdc-user-details.component';
import { cdcUserCmsConfig } from '../cdc-user.config';
import {
  CardModule,
  DisableInfoModule,
  ToggleStatusModule,
} from '@spartacus/organization/administration/components';
import { ItemExistsModule } from '../../../../feature-libs/organization/administration/components/shared/item-exists.module';
@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ToggleStatusModule,
    ItemExistsModule,
    DisableInfoModule,
    KeyboardFocusModule,
    ConfigModule.withConfig(cdcUserCmsConfig),
  ],
  declarations: [CdcUserDetailsComponent],
  exports: [CdcUserDetailsComponent],
})
export class CdcUserDetailsModule {}
