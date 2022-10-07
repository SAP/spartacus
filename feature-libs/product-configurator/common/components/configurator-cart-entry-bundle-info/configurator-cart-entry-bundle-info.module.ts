/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { I18nModule } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { ConfigureCartEntryModule } from '../configure-cart-entry/configure-cart-entry.module';
import { ConfiguratorCartEntryBundleInfoRowComponent } from './configurator-cart-entry-bundle-info-row.component';
import { ConfiguratorCartEntryBundleInfoComponent } from './configurator-cart-entry-bundle-info.component';

@NgModule({
  imports: [CommonModule, I18nModule, ConfigureCartEntryModule],
  declarations: [
    ConfiguratorCartEntryBundleInfoComponent,
    ConfiguratorCartEntryBundleInfoRowComponent,
  ],
  exports: [
    ConfiguratorCartEntryBundleInfoComponent,
    ConfiguratorCartEntryBundleInfoRowComponent,
  ],

  providers: [
    provideOutlet({
      id: CartOutlets.LIST_ITEM,
      position: OutletPosition.AFTER,
      component: ConfiguratorCartEntryBundleInfoRowComponent,
    }),
  ],
})
export class ConfiguratorCartEntryBundleInfoModule {}
