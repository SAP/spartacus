/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  Input,
  NgModule,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'cx-org-card',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content />',
})
export class MockCardComponent {
  @Input() i18nRoot;
  @Input() previous;
  @Input() showHint? = false;
}

@NgModule({
  imports: [MockCardComponent],
  exports: [MockCardComponent],
})
export class CardTestingModule {}
