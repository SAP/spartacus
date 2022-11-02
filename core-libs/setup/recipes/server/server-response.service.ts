/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import type { Response } from 'express';

/**
 * Wrapper service for the server response object.
 */
@Injectable({ providedIn: 'root' })
export class ServerResponseService {
  constructor(
    @Optional()
    @Inject(RESPONSE)
    protected serverResponse: Response
  ) {}

  // SPIKE TODO: rethink naming (context vs. server rendering output context)
  readonly CX_SERVER_RENDERING_CONTEXT_KEY = 'cxRenderingContext';

  /**
   * Returns a context object that ExpressJS middleware can read before
   * sending the final response to the client.
   *
   * For more see: https://expressjs.com/en/api.html#res.locals
   */
  protected get context(): Record<string, any> {
    // initialize if not yet initialized
    if (!this.serverResponse.locals[this.CX_SERVER_RENDERING_CONTEXT_KEY]) {
      this.serverResponse.locals[this.CX_SERVER_RENDERING_CONTEXT_KEY] = {};
    }

    return this.serverResponse.locals[this.CX_SERVER_RENDERING_CONTEXT_KEY];
  }

  /**
   * Sets a context value for a given key to the ExpressJs response object.
   */
  setContext(key: string, value: any) {
    this.context[key] = value;
  }

  /**
   * Returns a context value for a given key from the ExpressJs response object.
   */
  getContext(key: string) {
    return this.context[key];
  }
}
