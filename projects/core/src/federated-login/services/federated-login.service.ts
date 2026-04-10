/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { map } from 'rxjs';
import { LanguageService } from '../../site-context/facade/language.service';
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
  languageService = inject(LanguageService);

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
    console.log('detecting context');

    if (this.isLoginDomain) {
      const storedContext = this.contextStorage.read();

      if (this.config?.contextParameterName) {
        const serializedContext = new HttpParams({
          fromString: this.windowRef.location.search,
        }).get(this.config?.contextParameterName);

        const deserializedContext =
          this.contextSerializerService.deserializeContext(serializedContext);

        this.contextValue = { ...storedContext, ...deserializedContext };
        this.contextStorage.write(this.contextValue);
      }
    } else {
      // TODO: Do we need anything here?
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
