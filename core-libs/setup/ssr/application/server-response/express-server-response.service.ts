/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Applicable, Priority } from '@spartacus/core';
import type { Response } from 'express';
import { ServerResponseService } from './server-response.service';

/**
 * Wrapper service for the ExpressJS server Response object.
 */
@Injectable({ providedIn: 'root' })
export class ExpressServerResponseService
  extends ServerResponseService
  implements Applicable
{
  constructor(
    @Optional()
    @Inject(RESPONSE)
    protected response: Response
  ) {
    super();
  }

  // Applicable interface start
  /**
   * @override
   * Returns true if the app is running on the ExpressJS server.
   *
   * In particular, when the injection token `RESPONSE`
   * (from `@nguniversal/express-engine`) is provided.
   */
  hasMatch(): boolean {
    return !!this.response;
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
  // Applicable interface end

  /**
   * @override
   * Sets a context value for a given key in the ExpressJS `Response.locals` object.
   *
   * An ExpressJS middleware can read this context before
   * sending the final response to the client.
   *
   * For more see: https://expressjs.com/en/api.html#res.locals
   */
  override setContext(key: string, value: unknown): void {
    this.response.locals[key] = value;
  }

  /**
   * @override
   * Returns a context value for a given key in the ExpressJS `Response.locals` object.
   *
   * An ExpressJS middleware can read this context before
   * sending the final response to the client.
   *
   * For more see: https://expressjs.com/en/api.html#res.locals
   */
  override getContext(key: string): unknown {
    return this.response.locals[key];
  }
}
