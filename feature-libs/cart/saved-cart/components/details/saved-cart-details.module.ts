/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  IconModule,
  MediaModule,
  OutletModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { SavedCartDetailsActionComponent } from './saved-cart-details-action/saved-cart-details-action.component';
import { SavedCartDetailsItemsComponent } from './saved-cart-details-items/saved-cart-details-items.component';
import { SavedCartDetailsOverviewComponent } from './saved-cart-details-overview/saved-cart-details-overview.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
    CardModule,
    MediaModule,
    IconModule,
    SpinnerModule,
    OutletModule,
    AddToCartModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SavedCartDetailsOverviewComponent: {
          component: SavedCartDetailsOverviewComponent,
          guards: [AuthGuard],
        },
        SavedCartDetailsItemsComponent: {
          component: SavedCartDetailsItemsComponent,
          guards: [AuthGuard],
        },
        SavedCartDetailsActionComponent: {
          component: SavedCartDetailsActionComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    SavedCartDetailsOverviewComponent,
    SavedCartDetailsActionComponent,
    SavedCartDetailsItemsComponent,
  ],
  exports: [
    SavedCartDetailsOverviewComponent,
    SavedCartDetailsActionComponent,
    SavedCartDetailsItemsComponent,
  ],
})
export class SavedCartDetailsModule {}
