/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';

/** Test double for Spartacus `cx-media` (`MediaComponent`). */
@Component({
  selector: 'cx-media',
  template: `@if (src) {
    <img [src]="src" [attr.alt]="alt" />
  }`,
})
export class MockMediaComponent {
  @Input() container: unknown;
  @Input() format: unknown;
  @Input() alt: unknown;

  get src(): string | undefined {
    const container = this.container as
      | { product?: { url?: string }; url?: string }
      | undefined;
    return container?.product?.url ?? container?.url;
  }
}
