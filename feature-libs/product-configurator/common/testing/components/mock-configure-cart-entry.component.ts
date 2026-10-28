/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';

/** Stand-in for {@link ConfigureCartEntryComponent} in unit tests. */
@Component({
  selector: 'cx-configure-cart-entry',
  template: '',
})
export class MockConfigureCartEntryComponent {
  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;
  @Input() msgBanner: boolean;
  @Input() disabled: boolean;
  @Input() isBundleOverviewLink = false;
  @Input() rowId?: string;
  @Input() a11yDescriptionId?: string;
  @Input() productName?: string;
}
