/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { ServerResponseService } from '../server-response.service';
import {
  ServerErrorCollector,
  SERVER_ERROR_COLLECTOR,
} from './server-error.collector';

// SPIKE TODO: rethink naming Transfer - as is suggests transferring to the client
// maybe just ServerErrorService or RenderingErrorsService?

/**
 * Transfers errors that happened during the server side rendering
 * to the context of the server response object.
 *
 * Thanks to that, e.g. an ExpressJS middleware can intercept those errors
 * and handle appropriately (e.g. avoid caching the rendered HTML,
 * because it might be malformed due to the errors, and send a CSR fallback
 * in response to the client).
 */
@Injectable({ providedIn: 'root' })
export class TransferServerErrors {
  constructor(
    @Inject(SERVER_ERROR_COLLECTOR)
    protected ssrErrorsCollectors: ServerErrorCollector<unknown>[],
    protected windowRef: WindowRef,
    protected serverResponse: ServerResponseService
  ) {}

  /**
   * The key of the `renderingErrors` context property in the server response object.
   */
  protected readonly RENDERING_ERRORS_KEY = 'renderingErrors';

  /**
   * Returns all errors collected during the server side rendering.
   */
  protected collectErrors(): unknown[] {
    return this.ssrErrorsCollectors
      .map((collector) => collector.getErrors())
      .flat();
  }

  /**
   * Transfers errors that happened during the server side rendering
   * to the context of the server response object.
   */
  transferErrors(): void {
    const errors = this.collectErrors();

    if (errors.length) {
      this.serverResponse.setContext(this.RENDERING_ERRORS_KEY, errors);
    }
  }
}
