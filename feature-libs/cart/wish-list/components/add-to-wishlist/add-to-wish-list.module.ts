/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {

  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule, AtMessageModule } from '@spartacus/storefront';
import { AddToWishListComponent } from './add-to-wish-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    RouterModule,
    UrlModule,
    AtMessageModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        AddToWishListComponent: {
          component: AddToWishListComponent,
        },
      },
    }),
  ],
  declarations: [AddToWishListComponent],
  exports: [AddToWishListComponent],
})
export class AddToWishListModule {}
