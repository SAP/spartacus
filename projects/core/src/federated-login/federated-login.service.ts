/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FederatedLoginConfig } from './config/federated-login-config';
import {
  FederatedLoginContext,
  FederatedLoginContextSerializerService,
} from './federated-login-context-serializer.service';

@Injectable({ providedIn: 'root' })
export class FederatedLoginService {
  windowRef = inject(WindowRef);
  config = inject(FederatedLoginConfig).federatedLogin;
  contextSerializerService = inject(FederatedLoginContextSerializerService);

  enabled = this.config?.enabled ?? false;

  /** Is the current domain a federated login domain */
  loginDomain = this.isLoginDomain();

  contextValue: FederatedLoginContext | undefined;

  get origin(): string | undefined {
    return this.contextValue?.origin;
  }

  get language(): string | undefined {
    return this.contextValue?.language;
  }

  get currency(): string | undefined {
    return this.contextValue?.currency;
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
    this.contextValue =
      this.contextSerializerService.deserializeContext(context);
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

  protected isLoginDomain() {
    return (
      this.config?.loginDomains.some(
        (origin) => origin === this.windowRef.location.host
      ) ?? false
    );
  }
}
