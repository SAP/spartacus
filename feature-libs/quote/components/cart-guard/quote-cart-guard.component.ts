/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { QuoteCartGuard } from './quote-cart.guard';

/**
 * This component is used as a marker. In case it is present in the CMS composition of a page,
 * this page can be navigated to only if the {@link QuoteCartGuard}, which is attached
 * to this component, allows it. If not, the navigation will be re-directed to the quote
 * details page of the quote that is attached to the current cart.
 */
@Component({
  templateUrl: './quote-cart-guard.component.html',
})
export class QuoteCartGuardComponent {}
