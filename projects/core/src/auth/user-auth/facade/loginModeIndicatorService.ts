/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';

/**
 * The AsmEnablerService is used to enable ASM for those scenario's
 * where it's actually used. This service is added to avoid any polution
 * of the UI and runtime performance for the ordinary production user.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginModeIndicatorService {
  constructor(
    protected location: Location,
    protected winRef: WindowRef
  ) {}

  /**
   * Indicates whether the ASM module is enabled.
   */
  isEnabled(): boolean {
    if (this.isLaunched() && !this.isUsedBefore()) {
      if (this.winRef.localStorage) {
        this.winRef.localStorage.setItem('asm_enabled', 'true');
      }
    }
    return this.isLaunched() || this.isUsedBefore() || this.isEmulateInURL();
  }

  /**
   * Indicates whether ASM is launched through the URL,
   * using the asm flag in the URL.
   */
  protected isLaunched(): boolean {
    const params = this.location.path().split('?')[1];
    return !!params && params.split('&').includes('asm=true');
  }

  /**
   * check whether try to emulate customer from deeplink
   * */
  isEmulateInURL(): boolean {
    return this.location.path().indexOf('assisted-service/emulate?') > 0;
  }

  /**
   * Evaluates local storage where we persist the usage of ASM.
   */
  protected isUsedBefore(): boolean {
    if (this.winRef.localStorage) {
      return this.winRef.localStorage.getItem('asm_enabled') === 'true';
    } else {
      return false;
    }
  }
}