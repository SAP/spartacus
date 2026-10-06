/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cx-org-message',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '',
})
export class MockMessageComponent {}

@NgModule({
  imports: [MockMessageComponent],
  exports: [MockMessageComponent],
})
export class MessageTestingModule {}
