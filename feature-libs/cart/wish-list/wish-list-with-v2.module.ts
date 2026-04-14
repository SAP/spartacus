/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { WishListModule } from './wish-list.module';
import { WishListV2Module } from './wish-list-v2.module';

@NgModule({
  imports: [WishListModule, WishListV2Module],
})
export class WishListWithV2Module {}
