/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, input } from '@angular/core';

@Component({
  selector: 'cx-media',
  template: `@if (src) {
    <img [src]="src" [attr.alt]="alt()" />
  }`,
})
export class MockMediaComponent {
  readonly container = input<unknown>();
  readonly format = input<unknown>();
  readonly alt = input<unknown>();

  get src(): string | undefined {
    const container = this.container() as
      { product?: { url?: string }; url?: string } | undefined;
    return container?.product?.url ?? container?.url;
  }
}
