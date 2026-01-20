/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input, NgModule } from '@angular/core';
import { FocusConfig } from './keyboard-focus.model';

@Directive({ selector: '[cxFocus]' })
export class MockKeyboardFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

@NgModule({
  imports: [MockKeyboardFocusDirective],
  exports: [MockKeyboardFocusDirective],
})
export class KeyboardFocusTestingModule {}
