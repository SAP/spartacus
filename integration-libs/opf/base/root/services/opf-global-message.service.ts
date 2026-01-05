/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  Translatable,
} from '@spartacus/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfGlobalMessageService extends GlobalMessageService {
  protected isGlobalMessageDisabled = false;
  protected disabledKeys: string[] = [];
  protected defaultTimeout = 2000;

  /**
   * Add one message into store
   * @param text: string | Translatable
   * @param type: GlobalMessageType object
   * @param timeout: number
   */
  add(
    text: string | Translatable,
    type: GlobalMessageType,
    timeout?: number
  ): void {
    if (
      this.isGlobalMessageDisabled &&
      this.disabledKeys?.length &&
      (text as Translatable)?.key &&
      this.disabledKeys.includes((text as Translatable).key as string)
    ) {
      return;
    }
    super.add(text, type, timeout);
  }

  /**
   * disable specific keys for a period of time
   * @param keys: string[]
   * @param timeout: number
   */
  disableGlobalMessage(keys: string[], timeout?: number): void {
    this.isGlobalMessageDisabled = true;
    this.disabledKeys = keys;
    timer(timeout ?? this.defaultTimeout)
      .pipe(take(1))
      .subscribe(() => {
        this.isGlobalMessageDisabled = false;
        this.disabledKeys = [];
      });
  }
}
