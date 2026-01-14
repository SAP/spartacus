/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';

/**
 * Root component that belongs to the example app, not Spartacus libraries.
 * In customers' applications, the analogical root AppComponent belongs to the custom app.
 */
@Component({
  selector: 'app-root',
  template: `<cx-storefront></cx-storefront>`,

  // eslint-disable-next-line @angular-eslint/prefer-standalone -- This component must be non-standalone to support NgModule.bootstrap[] in the AppModule
  standalone: false,
})
export class AppComponent {}
