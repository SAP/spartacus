/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CommonEngine,
  CommonEngineOptions,
  CommonEngineRenderOptions,
} from '@angular/ssr';
import { PROPAGATE_ERROR_TO_SERVER } from '../error-handling/error-response/propagate-error-to-server';

/**
 * The Spartacus extension of the Angular's `CommonEngine`. It is able to handle the propagated server responses caught during server-side rendering of a Spartacus app.
 * For reference, see Angular's source code: https://github.com/angular/angular-cli/blob/6cf866225ab09f8b4b3803c000b632bed8448ce4/packages/angular/ssr/src/common-engine.ts#L56
 *
 * @extends {CommonEngine}
 */
export class CxCommonEngine extends CommonEngine {
  constructor(options?: CommonEngineOptions) {
    super(options);
  }

  /**
   * @override
   * Renders for the given options.
   * If an error is populated from the rendered applications
   * (via `PROPAGATE_ERROR_TO_SERVER` callback), then such an error
   * will be thrown and the result promise rejected - but only AFTER the rendering is complete.
   * In other words, at first an error occurs and it's captured, then we wait until the rendering completes
   * and ONLY then we reject the promise with the payload being the encountered error.
   *
   * Note: if more errors are captured during the rendering, only the first one will be used
   *       as the payload of the rejected promise, others won't.
   *
   * @param {CommonEngineRenderOptions} options - The options to render.
   * @returns {Promise<string>} Promise which resolves with the rendered HTML as a string
   *                            OR rejects with the error, if any is propagated from the rendered app.
   */
  override async render(options: CommonEngineRenderOptions): Promise<string> {
    let error: undefined | unknown;

    return super
      .render({
        ...options,
        providers: [
          {
            provide: PROPAGATE_ERROR_TO_SERVER,
            useFactory: () => {
              return (propagatedError: unknown) => {
                // We're interested only the first propagated error, so we use `??=` instead of `=`:
                error ??= propagatedError;
              };
            },
          },
          ...(options.providers ?? []),
        ],
      })
      .then((html: string) => {
        if (error) {
          throw error;
        }
        return html;
      });
  }
}
