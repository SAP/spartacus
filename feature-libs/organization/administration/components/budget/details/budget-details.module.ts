/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@commerce-storefront-toolset/core';
import { KeyboardFocusModule } from '@commerce-storefront-toolset/storefront';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { CardModule } from '../../shared/card/card.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { BudgetDetailsComponent } from './budget-details.component';
import { DisableInfoModule } from '../../shared/detail/disable-info/disable-info.module';

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
  declarations: [BudgetDetailsComponent],
})
export class BudgetDetailsModule {}
