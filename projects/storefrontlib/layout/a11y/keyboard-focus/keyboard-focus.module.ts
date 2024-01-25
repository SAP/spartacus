/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusDirective } from './focus.directive';

const directives = [
  // PersistFocusDirective,
  // VisibleFocusDirective,
  // BlockFocusDirective,
  // AutoFocusDirective,
  // EscapeFocusDirective,
  // LockFocusDirective,
  // TrapFocusDirective,
  // TabFocusDirective,
  FocusDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...directives],
  exports: [...directives],
})
export class KeyboardFocusModule {}
