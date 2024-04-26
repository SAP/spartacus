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
   * Renders the given options and handles any server error response.
   * If an error response exists, it will be thrown after the rendering is complete.
   * @param {CommonEngineRenderOptions} options - The options to render.
   * @returns {Promise<string>} The rendered HTML as a string.
   * @throws {CxServerErrorResponse} The server error response, if one occurred during rendering.
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
