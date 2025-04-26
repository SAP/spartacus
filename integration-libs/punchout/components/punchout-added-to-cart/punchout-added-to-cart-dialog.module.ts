/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  BtnLikeLinkModule,
  IconModule,
  ItemCounterModule,
  KeyboardFocusModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import {
  AddedToCartDialogModule,
  CartSharedModule,
  defaultAddedToCartLayoutConfig,
} from '@spartacus/cart/base/components';
import { PunchoutAddedToCartDialogEventListener } from './punchout-added-to-cart-dialog-event.listener';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartSharedModule,
    RouterModule,
    SpinnerModule,
    PromotionsModule,
    UrlModule,
    IconModule,
    I18nModule,
    ItemCounterModule,
    KeyboardFocusModule,
    FeaturesConfigModule,
    BtnLikeLinkModule,
  ],
  providers: [provideDefaultConfig(defaultAddedToCartLayoutConfig)],
})
export class PunchoutAddedToCartDialogModule extends AddedToCartDialogModule {
  constructor(
    _addToCartDialogEventListener: PunchoutAddedToCartDialogEventListener
  ) {
    super(_addToCartDialogEventListener);
  }
}
