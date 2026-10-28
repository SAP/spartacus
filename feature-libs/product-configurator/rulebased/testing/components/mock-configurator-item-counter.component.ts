/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';

/** Stand-in for storefront {@link ItemCounterComponent} in unit tests. */
@Component({
  selector: 'cx-item-counter',
  template: '',
})
export class MockConfiguratorItemCounterComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() step: unknown;
  @Input() control: unknown;
  @Input() allowZero: boolean;
}
