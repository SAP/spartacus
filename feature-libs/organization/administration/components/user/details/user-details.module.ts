/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CardModule } from '../../shared/card/card.module';
import { DisableInfoModule } from '../../shared/detail/disable-info/disable-info.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { UserDetailsComponent } from './user-details.component';

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
  declarations: [UserDetailsComponent],
  exports: [UserDetailsComponent],
})
export class UserDetailsModule {}
