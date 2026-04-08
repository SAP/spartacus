/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FederatedLoginConfig } from './config/federated-login-config';

@Injectable({ providedIn: 'root' })
export class FederatedOriginsService {
  windowRef = inject(WindowRef);
  config = inject(FederatedLoginConfig).federatedLogin;

  enabled = this.config?.enabled ?? false;

  loginDomain = this.isLoginDomain();

  origin: string | undefined;

  deserializeContext(context: string | null | undefined) {
    return context ? this.config?.originMap[context] : undefined;
  }

  getParameters() {
    return new HttpParams({
      fromObject: {
        [this.config?.contextParameterName ?? '']: this.serializeContext(),
      },
    }).toString();
  }

  protected serializeContext() {
    return 'de';
  }

  setContext(context: string | null | undefined) {
    this.origin = this.deserializeContext(context);
  }

  detectContext() {
    console.log('detecting context');
    if (this.config?.contextParameterName) {
      const context = new HttpParams({
        fromString: this.windowRef.location.search,
      }).get(this.config?.contextParameterName);

      this.setContext(context);
    }
  }

  getOrigin() {
    return this.origin;
  }

  protected isLoginDomain() {
    return (
      this.config?.loginDomains.some(
        (origin) => origin === this.windowRef.location.host
      ) ?? false
    );
  }
}
