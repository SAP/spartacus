/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, MediaModule } from '@spartacus/storefront';
import { ConfiguratorProductTitleComponent } from './configurator-product-title.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    I18nModule,
    IconModule,
    MediaModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorProductTitle: {
          component: ConfiguratorProductTitleComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorProductTitleComponent],
  exports: [ConfiguratorProductTitleComponent],
})
export class ConfiguratorProductTitleModule {}
