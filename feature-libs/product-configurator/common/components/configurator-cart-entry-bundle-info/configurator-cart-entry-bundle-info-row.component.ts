/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';

// SPIKE NEW:
@Component({
  selector: 'cx-configurator-cart-entry-bundle-info-row',
  template: `
    <td colspan="4">
      <cx-configurator-cart-entry-bundle-info></cx-configurator-cart-entry-bundle-info>
    </td>
  `,
  host: { role: 'row' },
})
export class ConfiguratorCartEntryBundleInfoRowComponent {}
