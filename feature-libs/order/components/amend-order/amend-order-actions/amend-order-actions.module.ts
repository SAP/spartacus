/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { AmendOrderActionsComponent } from './amend-order-actions.component';
import { BtnLikeLinkModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    BtnLikeLinkModule,
  ],
  declarations: [AmendOrderActionsComponent],
  exports: [AmendOrderActionsComponent],
})
export class AmendOrderActionsModule {}
