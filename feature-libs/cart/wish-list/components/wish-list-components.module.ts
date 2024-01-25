/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  AtMessageModule,
  ItemCounterModule,
  MediaModule,
  PageComponentModule,
  StarRatingModule,
} from '@spartacus/storefront';
import { WishListItemComponent } from './wish-list-item/wish-list-item.component';
import { WishListComponent } from './wish-list/wish-list.component';

@NgModule({
  imports: [
    AtMessageModule,
    CommonModule,
    I18nModule,
    ItemCounterModule,
    MediaModule,
    PageComponentModule,
    RouterModule,
    StarRatingModule,
    UrlModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        WishListComponent: {
          component: WishListComponent,
          data: {
            composition: {
              inner: ['ProductAddToCartComponent'],
            },
          },
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [WishListComponent, WishListItemComponent],
  exports: [WishListComponent, WishListItemComponent],
})
export class WishListComponentsModule {}
