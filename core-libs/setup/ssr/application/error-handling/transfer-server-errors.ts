/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { ServerResponseService } from '../server-response/server-response.service';
import {
  ServerErrorCollector,
  SERVER_ERROR_COLLECTORS,
} from './server-error.collector';

/**
 * Transfers errors that happened during rendering on the platform server
 * to the context of the rendered server Response.
 *
 * Thanks to that, e.g. an ExpressJS middleware can intercept those errors
 * and handle appropriately (e.g. avoid caching the rendered HTML,
 * because it might be malformed due to the errors; and send a CSR fallback
 * in response to the client).
 */
@Injectable({ providedIn: 'root' })
export class TransferServerErrors {
  constructor(
    @Inject(SERVER_ERROR_COLLECTORS)
    protected serverErrorCollectors: ServerErrorCollector<unknown>[],
    protected windowRef: WindowRef,
    protected serverResponse: ServerResponseService
  ) {}

  /**
   * The key of the `cxRenderingErrors` context property in the server response object.
   */
  protected readonly CX_RENDERING_ERRORS_KEY = 'cxRenderingErrors';

  /**
   * Returns all errors collected during the rendering on the platform server.
   */
  protected collectErrors(): unknown[] {
    return this.serverErrorCollectors
      .map((collector) => collector.getErrors())
      .flat();
  }

  /**
   * Transfers errors that happened during the rendering on the platform server
   * to the context of the server Response.
   */
  transferErrors(): void {
    const errors = this.collectErrors();

    if (errors.length) {
      this.serverResponse.setContext(this.CX_RENDERING_ERRORS_KEY, errors);
    }
  }
}
