/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'cx-org-message',
  template: '',
  standalone: false,
})
class MessageComponent {}

@NgModule({
  declarations: [MessageComponent],
  exports: [MessageComponent],
})
export class MessageTestingModule {}
