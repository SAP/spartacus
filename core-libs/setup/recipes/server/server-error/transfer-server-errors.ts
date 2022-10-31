import { Inject, Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { escapeHtml } from './escape-html';
import {
  ServerErrorCollector,
  SERVER_ERROR_COLLECTOR,
} from './server-error-collector';
import { ServerResponseService } from './server-response.service';

export interface ServerErrorsSummary {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class TransferServerErrors {
  constructor(
    @Inject(SERVER_ERROR_COLLECTOR)
    protected ssrErrorsCollectors: ServerErrorCollector<any>[],
    protected windowRef: WindowRef,
    protected serverResponse: ServerResponseService
  ) {}

  /**
   * The id of the `<script>` element that contains the serialized errors summary.
   */
  protected readonly SERVER_ERRORS_SCRIPT_ID = 'cx-server-errors';

  /**
   * The key of the renderingErrors context property in the server response object.
   */
  protected readonly RENDERING_ERRORS_KEY = 'renderingErrors';

  /**
   * Returns all errors collected during the server side rendering of the page.
   */
  protected collectErrors(): any[] {
    return this.ssrErrorsCollectors
      .map((collector) => collector.getErrors())
      .flat();
  }

  /**
   * Checks if errors happened during the rendering of the page.
   *
   * If yes, handles them appropriately. By default, it serializes
   * the errors summary into the DOM.
   *
   * This allows an (ExpressJS) server middleware for recognizing a page that had errors
   * during the rendering, and the server middleware can react accordingly.
   * For example it can fallback to CSR (just send a shell index.html with no-cache headers).
   */
  transferErrors() {
    const errors = this.collectErrors();

    if (errors.length) {
      const errorsReport = this.getErrorsSummary(errors);
      this.serverResponse.setContext(this.RENDERING_ERRORS_KEY, errorsReport);

      // SPIKE TODO: remove the logic for serializing
      // this.serializeErrorsToScriptElement(errorsReport);
    }
  }

  /**
   * Returns a summary of errors, with the number of errors.
   *
   * Potentially can be extended with other properties, like the list of errors
   * or the count for specific types of errors.
   */
  protected getErrorsSummary(errors: any[]): ServerErrorsSummary {
    return {
      count: errors.length,
    };
  }

  /**
   * Serializes the summary of errors object to a `<script type="application/json">`
   * and embeds it in the DOM. Special characters are escaped
   */
  protected serializeErrorsToScriptElement(errorsSummary: ServerErrorsSummary) {
    const serializedErrorsSummary = JSON.stringify(errorsSummary);

    const script = this.windowRef.document.createElement('script');
    script.id = this.SERVER_ERRORS_SCRIPT_ID;
    script.setAttribute('type', 'application/json');
    script.textContent = escapeHtml(serializedErrorsSummary);
    this.windowRef.document.body.appendChild(script);
  }
}
