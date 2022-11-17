/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable } from '@angular/core';
import { INITIAL_CONFIG, PlatformConfig } from '@angular/platform-server';
import { Priority } from '@spartacus/core';
import { inspect } from 'util'; // Native NodeJS module
import { ServerResponseService } from './server-response.service';

/**
 * Wrapper service for the server Response, throwing errors when used.
 *
 * Used when there is no Response object to communicate to.
 */
@Injectable({ providedIn: 'root' })
export class FallbackServerResponseService extends ServerResponseService {
  constructor(
    @Inject(INITIAL_CONFIG) protected platformConfig: PlatformConfig
  ) {
    super();
  }

  // Applicable interface start
  hasMatch(): boolean {
    return true;
  }

  getPriority(): Priority {
    return Priority.FALLBACK;
  }
  // Applicable interface end

  /**
   * @override
   * Console.logs a context value for a given key.
   */
  override setContext(key: string, value: any): void {
    // SPIKE TODO: polish this
    const inspectFn = inspect ?? ((x) => x);
    this.throwError(
      `set Response context for key '${key}' with value: ${inspectFn(value)}`
    );
  }

  override getContext(key: string): undefined {
    this.throwError(`get Response context for key '${key}'`);
    return undefined;
  }

  /**
   * Returns the URL path (not full URL) of the current server request.
   */
  protected get url(): string {
    return this.platformConfig.url ?? ''; // SPIKE TODO: HANDLE THE CASE WHEN `url` IS UNDEFINED
  }

  /**
   * Throws an error with the given message and logs it into the console.
   *
   * Console.error is executed just in case, if Angular Universal internals would
   * silence the internals.
   */
  protected throwError(message: string): void {
    message = `[URL ${this.url}] No server Response object! Attempted to ${message}`;

    console.error(message);
    throw new Error(message);
  }
}
