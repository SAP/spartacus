/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';
import { WishListStoreModule } from './store/wish-list-store.module';

@NgModule({
  imports: [WishListStoreModule],
  providers: [...facadeProviders],
})
export class WishListCoreModule {}
