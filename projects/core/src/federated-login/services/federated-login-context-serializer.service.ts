/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { FederatedLoginConfig } from '../config/federated-login-config';
import { FederatedLoginContext } from '../model';

@Injectable({ providedIn: 'root' })
export class FederatedLoginContextSerializerService {
  config = inject(FederatedLoginConfig).federatedLogin;

  serializeContext(context: FederatedLoginContext | undefined) {
    if (context?.origin) {
      const contextParts: string[] = [];

      const key = this.getContextKey(context.origin);

      if (!key) {
        return '';
      }
      contextParts.push(key);

      contextParts.push(context.language ?? '');

      return contextParts.join(':');
    }

    return '';
  }

  deserializeContext(serializedContext: string | null | undefined) {
    const [domain, language] = serializedContext?.split(':', 2) ?? [];
    const contextValue: FederatedLoginContext = {};

    if (domain) {
      contextValue.origin = this.getOrigin(domain);
    }
    if (language) {
      contextValue.language = language;
    }

    return contextValue;
  }

  protected getOrigin(contextKey: string) {
    return this.config?.originMap[contextKey];
  }

  protected getContextKey(origin: string) {
    return Object.entries(this.config?.originMap ?? {}).find(
      ([_key, originValue]) => {
        return originValue === origin;
      }
    )?.[0];
  }
}
