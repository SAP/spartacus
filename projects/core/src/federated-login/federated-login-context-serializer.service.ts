/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { FederatedLoginConfig } from '@spartacus/core';

export interface FederatedLoginContext {
  origin: string | undefined;
  language: string | undefined;
  currency: string | undefined;
}

@Injectable({ providedIn: 'root' })
export class FederatedLoginContextSerializerService {
  config = inject(FederatedLoginConfig).federatedLogin;

  serializeContext(context: Partial<FederatedLoginContext>) {
    const value: string[] = [];

    if (context.origin) {
      const key = Object.entries(this.config?.originMap ?? {}).find(
        ([_key, value]) => {
          return value === context.origin;
        }
      )?.[0];

      if (!key) {
        return '';
      }
      value.push(key);
    }

    value.push(context.language ?? '');

    value.push(context.currency ?? '');

    return value.join(':');
  }

  deserializeContext(serializedContext: string | null | undefined) {
    const [domain, language, currency] = serializedContext?.split(':', 3) ?? [];
    const contextValue: FederatedLoginContext = {
      currency: undefined,
      language: undefined,
      origin: undefined,
    };

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
