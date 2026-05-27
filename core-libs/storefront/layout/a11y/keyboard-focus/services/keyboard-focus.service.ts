/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, signal } from '@angular/core';
import { LockFocusService } from '../lock/lock-focus.service';

@Injectable({
  providedIn: 'root',
})
export class KeyboardFocusService extends LockFocusService {
  protected mouseFocusState = signal(true);

  public setMouseFocus(value: boolean) {
    this.mouseFocusState.set(value);
  }

  public readonly isMouseFocus = this.mouseFocusState.asReadonly();
}
