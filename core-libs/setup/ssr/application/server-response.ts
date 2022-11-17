/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

/**
 * Wrapper service for the server Response.
 */
@Injectable()
export abstract class ServerResponseService {
  /**
   * Sets a context value for a given key to the server Response.
   */
  abstract setContext(key: string, value: unknown): void;

  /**
   * Returns a context value for a given key from the server Response.
   */
  abstract getContext(key: string): unknown;
}
