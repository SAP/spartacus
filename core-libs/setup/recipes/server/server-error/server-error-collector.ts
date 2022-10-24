/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Collects errors of a given type during the server side rendering.
 */
export interface ServerErrorCollector<T> {
  /**
   * Returns errors of a given type collected during the server side rendering.
   */
  getErrors: () => T[];
}

/**
 * Injection token for objects that collect errors from the server side rendering process.
 */
export const SERVER_ERROR_COLLECTOR = new InjectionToken<
  ServerErrorCollector<any>[]
>('SERVER_ERROR_COLLECTOR', { providedIn: 'root', factory: () => [] });
