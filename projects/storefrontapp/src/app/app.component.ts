/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { StorefrontComponent } from '@spartacus/storefront';
import { CartCheckoutPocModule } from './poc/cart-checkout-poc/cart-checkout-poc.module';

/**
 * Root component that belongs to the example app, not Spartacus libraries.
 * In customers' applications, the analogical root AppComponent belongs to the custom app.
 */
@Component({
  selector: 'app-root',
  template: `
    <cx-cart-checkout-poc></cx-cart-checkout-poc>
    <cx-storefront></cx-storefront>
  `,
  imports: [CartCheckoutPocModule, StorefrontComponent],
})
export class AppComponent {}
