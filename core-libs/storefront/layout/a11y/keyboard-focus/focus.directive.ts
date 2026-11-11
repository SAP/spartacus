/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input, inject } from '@angular/core';
import { FocusConfig } from './keyboard-focus.model';
import { LockFocusDirective } from './lock/lock-focus.directive';
import { KeyboardFocusService } from './services/keyboard-focus.service';

@Directive({ selector: '[cxFocus]' })
export class FocusDirective extends LockFocusDirective {
  protected override service = inject(KeyboardFocusService);

  protected defaultConfig: FocusConfig = {};

  @Input('cxFocus') config: FocusConfig = {};
}
