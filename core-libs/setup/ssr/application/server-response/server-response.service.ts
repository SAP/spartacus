/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Applicable, Priority, resolveApplicable } from '@spartacus/core';
import { SERVER_RESPONSE_SERVICES } from './server-response.tokens';

/**
 * Wrapper service for the server Response.
 */
@Injectable({
  providedIn: 'root',
  useFactory: () => {
    const services = inject(SERVER_RESPONSE_SERVICES);
    return resolveApplicable(services);
  },
})
export abstract class ServerResponseService implements Applicable {
  // Applicable interface start
  abstract hasMatch(): boolean;
  abstract getPriority(): Priority;
  // Applicable interface end

  /**
   * Sets a context value for a given key to the server Response.
   */
  abstract setContext(key: string, value: unknown): void;

  /**
   * Returns a context value for a given key from the server Response.
   */
  abstract getContext(key: string): unknown;
}
