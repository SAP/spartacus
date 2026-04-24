/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { decodeBase64, encodeBase64 } from '@spartacus/core';
import { FederatedLoginConfig } from '../config/federated-login-config';
import { FederatedLoginContext } from '../model';

@Injectable({ providedIn: 'root' })
export class FederatedLoginContextSerializerService {
  config = inject(FederatedLoginConfig).federatedLogin;

  serializeContext(context: FederatedLoginContext | undefined): string {
    if (context?.origin) {
      const contextParts: string[] = [];

      const key = this.getContextKey(context.origin);

      if (!key) {
        return '';
      }
      contextParts.push(key);

      contextParts.push(context.language ?? '');

      const contextString = contextParts.join(':');

      return encodeBase64(contextString, { urlSafe: true });
    }

    return '';
  }

  deserializeContext(
    encodedContext: string | null | undefined
  ): FederatedLoginContext {
    if (!encodedContext) {
      return {};
    }

    const serializedContext = decodeBase64(encodedContext, {
      urlSafe: true,
    });
    const index = serializedContext.lastIndexOf(':');
    const originKey =
      index !== -1 ? serializedContext.substring(0, index) : serializedContext;
    const language =
      index !== -1 ? serializedContext.substring(index + 1) : undefined;

    const contextValue: FederatedLoginContext = {};

    if (originKey) {
      contextValue.origin = this.getOrigin(originKey);
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
