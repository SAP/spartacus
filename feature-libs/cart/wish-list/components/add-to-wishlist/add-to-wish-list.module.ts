/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { AtMessageModule, IconModule } from '@spartacus/storefront';
import { AddToWishListComponent } from './add-to-wish-list.component';

@NgModule({
    imports: [
        CommonModule,
        I18nModule,
        IconModule,
        RouterModule,
        UrlModule,
        AtMessageModule,
        FeaturesConfigModule,
        AddToWishListComponent,
    ],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                AddToWishListComponent: {
                    component: AddToWishListComponent,
                },
            },
        }),
    ],
    exports: [AddToWishListComponent],
})
export class AddToWishListModule {}
