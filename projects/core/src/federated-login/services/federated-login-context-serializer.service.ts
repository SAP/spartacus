/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { FederatedLoginConfig } from '../config/federated-login-config';
import { FederatedLoginContext } from '../model/federated-login-context.mode';

@Injectable({ providedIn: 'root' })
export class FederatedLoginContextSerializerService {
  config = inject(FederatedLoginConfig).federatedLogin;

  serializeContext(context: FederatedLoginContext | undefined) {
    if (context?.origin) {
      const value: string[] = [];

      const key = Object.entries(this.config?.originMap ?? {}).find(
        ([_key, value]) => {
          return value === context.origin;
        }
      )?.[0];

      if (!key) {
        return '';
      }
      value.push(key);

      value.push(context.language ?? '');

      // TODO: currency not needed
      if (context.currency) {
        value.push(context.currency ?? '');
      }

      return value.join(':');
    }

    return '';
  }

  deserializeContext(serializedContext: string | null | undefined) {
    const [domain, language, currency] = serializedContext?.split(':', 3) ?? [];
    const contextValue: FederatedLoginContext = {};

    if (domain) {
      contextValue.origin = this.config?.originMap[domain];
    }
    if (language) {
      contextValue.language = language;
    }
    if (currency) {
      contextValue.currency = currency;
    }

    return contextValue;
  }
}
