/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ScriptReadyNotificationService {
  private scriptReadySource = new Subject<void>();
  public scriptReady$ = this.scriptReadySource.asObservable();

  public notifyScriptReady(): void {
    this.scriptReadySource.next();
  }
}
