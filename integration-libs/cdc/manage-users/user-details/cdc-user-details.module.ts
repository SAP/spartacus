/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import {
  CardModule,
  DisableInfoModule,
  ToggleStatusModule,
} from '@spartacus/organization/administration/components';
import { ItemExistsModule } from '../../../../feature-libs/organization/administration/components/shared/item-exists.module';

import { B2BUserService } from '@spartacus/organization/administration/core';
import { CdcB2BUserService } from './cdc-b2b-user.service';

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
  ],
  providers: [{ provide: B2BUserService, useClass: CdcB2BUserService }],
})
export class CdcUserDetailsModule {}
