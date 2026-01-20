/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'cx-org-message',
  template: '',
})
export class MockMessageComponent {}

@NgModule({
  imports: [MockMessageComponent],
  exports: [MockMessageComponent],
})
export class MessageTestingModule {}
