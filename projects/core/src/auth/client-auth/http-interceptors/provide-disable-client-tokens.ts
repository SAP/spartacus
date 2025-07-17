/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { InjectionToken, Provider } from '@angular/core';

/**
 * Feature to enable or disable use of client tokens.
 */
export const CLIENT_TOKENS_ENABLED = new InjectionToken<boolean>(
  'CLIENT_TOKENS_ENABLED',
  {
    providedIn: 'root',
    factory: () => true,
  }
);

/**
 * When enabled, client tokens will not be used for guest user operations.
 *
 * NOTE: This flag should only be enabled when used with a CCv2 Authorization
 * Server running the September 2025 update or higher. The CCv2 Authorization
 * Server does not support the oAuth flow to retrieve a client token.  Public
 * OCC operations will not require an access token in this version and onwards.
 *
 * @usageNotes
 * Add to the root module providers:
 * ```
 * provideDisableClientTokens()
 * ```
 */
export function provideDisableClientTokens(value = true): Provider {
  return {
    provide: CLIENT_TOKENS_ENABLED,
    useValue: !value,
  };
}
