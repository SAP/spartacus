/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CommonEngine,
  CommonEngineOptions,
  CommonEngineRenderOptions,
} from '@angular/ssr';
import { CxServerErrorResponse } from '../error-handling';
import { PROPAGATE_SERVER_ERROR_RESPONSE } from '../error-handling/server-error-response/propagate-server-error-response';

/**
 * The Spartacus extension of the CommonEngine introduced to handle propagated server responses caught during server-side rendering.
 * @extends {CommonEngine}
 */
export class CxCommonEngine extends CommonEngine {
  /**
   * Stores any server error response that occurs during the rendering process.
   * @type {CxServerErrorResponse | undefined}
   */
  protected errorResponse: undefined | CxServerErrorResponse;

  constructor(options?: CommonEngineOptions) {
    super(options);
  }

  /**
   * @override
   * Renders for the given options.
   * If a server error response object is populated from the rendered applications
   * (via `PROPAGATE_SERVER_ERROR_RESPONSE` callback), then such an error
   * will be thrown and the result promise rejected - but only AFTER the rendering is complete.
   *
   * @param {CommonEngineRenderOptions} options - The options to render.
   * @returns {Promise<string>} Promise which resolves with the rendered HTML as a string
   *                                                 OR rejects with the server error response object, if any is propagated from the rendered app.
   */
  async render(options: CommonEngineRenderOptions): Promise<string> {
    return super
      .render({
        ...options,
        providers: [
          {
            provide: PROPAGATE_SERVER_ERROR_RESPONSE,
            useFactory: () => {
              return (serverErrorResponse: CxServerErrorResponse) => {
                this.errorResponse ??= serverErrorResponse;
              };
            },
          },
          ...(options.providers ?? []),
        ],
      })
      .then((html: string) => {
        if (this.errorResponse) {
          throw this.errorResponse;
        }
        return html;
      });
  }
}
