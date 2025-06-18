/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'cx-org-card',
  template: '<ng-content></ng-content>',
  standalone: false,
})
class MockCardComponent {
  @Input() i18nRoot;
  @Input() previous;
  @Input() showHint? = false;
}

@NgModule({
  declarations: [MockCardComponent],
  exports: [MockCardComponent],
})
export class CardTestingModule {}
