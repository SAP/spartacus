/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, ItemCounterModule } from '@spartacus/storefront';
import { ConfiguratorAddToCartButtonComponent } from './configurator-add-to-cart-button.component';

@NgModule({
  imports: [CommonModule, I18nModule, ItemCounterModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorAddToCartButton: {
          component: ConfiguratorAddToCartButtonComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAddToCartButtonComponent],
  exports: [ConfiguratorAddToCartButtonComponent],
})
export class ConfiguratorAddToCartButtonModule {}
