/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { B2bUnitSelectorOutletComponent } from '@spartacus/organization/b2b-unit-selection';
import { StorefrontComponent } from '@spartacus/storefront';

/**
 * Root component that belongs to the example app, not Spartacus libraries.
 * In customers' applications, the analogical root AppComponent belongs to the custom app.
 */
@Component({
  selector: 'app-root',
  template: `
    <cx-storefront></cx-storefront>
    <cx-b2b-unit-selector-outlet></cx-b2b-unit-selector-outlet>
  `,
  imports: [StorefrontComponent, B2bUnitSelectorOutletComponent],
})
export class AppComponent {}
