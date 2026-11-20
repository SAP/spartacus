/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, NgModule, input } from '@angular/core';
import { CurrentItemService } from '../current-item.service';
import { FormService } from './form.service';

@Component({
  selector: 'cx-org-form',
  template: '<ng-content />',
})
class MockFormComponent {
  readonly i18nRoot = input(undefined);
}

export class MockBudgetFormService {}

class MockCurrentItemService {}
class MockFormService {
  getForm = () => {};
}

@NgModule({
  imports: [MockFormComponent],
  exports: [MockFormComponent],
  providers: [
    {
      provide: CurrentItemService,
      useExisting: MockCurrentItemService,
    },
    {
      provide: FormService,
      useExisting: MockFormService,
    },
  ],
})
export class FormTestingModule {}
