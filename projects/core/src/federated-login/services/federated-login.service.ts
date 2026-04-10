/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FederatedLoginConfig } from '../config/federated-login-config';
import { FederatedLoginContext } from '../model/federated-login-context.mode';
import { FederatedLoginContextSerializerService } from './federated-login-context-serializer.service';
import { FederatedLoginContextStorageService } from './federated-login-context-storage';

@Injectable({ providedIn: 'root' })
export class FederatedLoginService {
  windowRef = inject(WindowRef);
  config = inject(FederatedLoginConfig).federatedLogin;
  contextSerializerService = inject(FederatedLoginContextSerializerService);
  contextStorage = inject(FederatedLoginContextStorageService);

  enabled = this.config?.enabled ?? false;

  /** Is the current domain a federated login domain */
  isLoginDomain = this.checkLoginDomain();

  contextValue?: FederatedLoginContext;

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

  detectContext() {
    console.log('detecting context');

    if (this.isLoginDomain) {
      const context = this.contextStorage.read();

      if (this.config?.contextParameterName) {
        const serializedContext = new HttpParams({
          fromString: this.windowRef.location.search,
        }).get(this.config?.contextParameterName);

        const transferredContext =
          this.contextSerializerService.deserializeContext(serializedContext);

        this.contextValue = { ...context, ...transferredContext };
        this.contextStorage.write(this.contextValue);
      }
    }
  }

  protected checkLoginDomain() {
    return (
      this.config?.loginDomains.some(
        (origin) => origin === this.windowRef.location.host
      ) ?? false
    );
  }
}
