/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, Provider } from '@angular/core';
import { ClientTokenInterceptor } from './client-token.interceptor';

export const CLIENT_TOKENS_DISABLED = new InjectionToken<boolean>(
  'CLIENT_TOKENS_DISABLED',
  {
    providedIn: 'root',
    factory: () => false,
  }
);

export function provideEnableClientTokens(): boolean {
  return true;
}

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: ClientTokenInterceptor,
    multi: true,
  },
];
