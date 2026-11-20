/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, NgModule, input } from '@angular/core';

@Component({
  selector: 'cx-org-card',
  template: '<ng-content />',
})
export class MockCardComponent {
  readonly i18nRoot = input(undefined);
  readonly previous = input(undefined);
  readonly showHint = input<boolean | undefined>(false);
}

@NgModule({
  imports: [MockCardComponent],
  exports: [MockCardComponent],
})
export class CardTestingModule {}
