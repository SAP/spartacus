/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';

/**
 * Component created for keeping the same HTML structure for the storefrontapp
 * as it is in the newly generated app.
 * Using its selector for styling has been disallowed, since its name can be various.
 */
@Component({
  selector: 'app-root',
  template: '<cx-storefront></cx-storefront>',
  standalone: false,
})
export class AppComponent {}
