/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LanguageService } from '../../site-context/facade/language.service';
import { WindowRef } from '../../window/window-ref';
import { FederatedLoginConfig } from '../config/federated-login-config';
import { FederatedLoginContext } from '../model';
import { FederatedLoginContextSerializerService } from './federated-login-context-serializer.service';
import { FederatedLoginContextStorageService } from './federated-login-context-storage';

@Injectable({ providedIn: 'root' })
export class FederatedLoginService {
  windowRef = inject(WindowRef);
  config = inject(FederatedLoginConfig).federatedLogin;
  contextSerializerService = inject(FederatedLoginContextSerializerService);
  contextStorage = inject(FederatedLoginContextStorageService);
  languageService = inject(LanguageService);

  enabled = this.config?.enabled ?? false;

  /** Is the current domain a federated login domain */
  isLoginDomain = this.checkLoginDomain();

  protected contextValue?: FederatedLoginContext;

  get origin(): string | undefined {
    return this.contextValue?.origin;
  }

  get language(): string | undefined {
    return this.contextValue?.language;
  }

  /** Returns the context serialized and encoded as a parameter string */
  getParameters() {
    return this.languageService.getActive().pipe(
      map((activeLanguage) => {
        return {
          language: activeLanguage,
          origin: this.isLoginDomain
            ? this.origin
            : this.windowRef.location.origin,
        } as FederatedLoginContext;
      }),

      map((context) =>
        new HttpParams({
          fromObject: {
            [this.config?.contextParameterName ?? '']:
              this.contextSerializerService.serializeContext(context),
          },
        }).toString()
      )
    );
  }

  detectContext() {
    if (this.isLoginDomain) {
      const storedContext = this.validateContext(this.contextStorage.read());

      if (this.config?.contextParameterName) {
        // Using `location.href` for SSR support
        const serializedContext = new URL(
          this.windowRef.location.href as string
        ).searchParams.get(this.config?.contextParameterName);

        const deserializedContext =
          this.contextSerializerService.deserializeContext(serializedContext);

        this.contextValue = { ...storedContext, ...deserializedContext };
        this.contextStorage.write(this.contextValue);
      }
    }
  }

  protected checkLoginDomain() {
    // Using `location.origin` for SSR support
    return (
      this.config?.loginHosts.some(
        (host) =>
          host === new URL(this.windowRef.location.origin as string).host
      ) ?? false
    );
  }

  /** Validate stored origin is part of the context map */
  protected validateContext(contextValue: FederatedLoginContext | undefined) {
    const isOriginValid = Object.values(this.config?.originMap ?? {}).some(
      (mapValue) => mapValue === contextValue?.origin
    );

    if (isOriginValid) {
      return contextValue;
    } else {
      return {
        ...contextValue,
        origin: undefined,
      };
    }
  }
}
