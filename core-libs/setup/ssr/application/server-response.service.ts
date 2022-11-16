/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import type { Response } from 'express';

/**
 * Wrapper service for the ExpressJS `Response` object.
 */
@Injectable({ providedIn: 'root' })
export class ServerResponseService {
  constructor(
    @Optional()
    @Inject(RESPONSE)
    protected serverResponse: Response
  ) {}

  /**
   * Sets a context value for a given key to the ExpressJS response object.
   *
   * An ExpressJS middleware can read this context before
   * sending the final response to the client.
   *
   * For more see: https://expressjs.com/en/api.html#res.locals
   */
  setContext(key: string, value: any) {
    this.serverResponse.locals[key] = value;
  }

  /**
   * Returns a context value for a given key from the ExpressJs response object.
   *
   * An ExpressJS middleware can read this context before
   * sending the final response to the client.
   *
   * For more see: https://expressjs.com/en/api.html#res.locals
   */
  getContext(key: string) {
    return this.serverResponse.locals[key];
  }
}
