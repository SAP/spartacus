import { Injectable } from '@angular/core';
import { ServerErrorResponseTransformer } from './server-error-response-transformers';
import { CmsPageNotFoundServerError, CxServerError } from '../server-errors';
import { HttpErrorResponse } from '@angular/common/http';
import { Priority } from '@spartacus/core';

/**
 * A transformer responsible for transforming an HTTP error response into a {@link CmsPageNotFoundServerError}.
 * The transformer is applicable when the error the URL contains 'cms/pages'.
 */
@Injectable({
  providedIn: 'root',
})
export class CmsPageNotFoundServerErrorResponseTransformer
  implements ServerErrorResponseTransformer
{
  hasMatch(error: unknown): boolean {
    return (
      this.isHttpErrorResponse(error) && !!error.url?.includes('cms/pages')
    );
  }

  getPriority(): number {
    return Priority.NORMAL;
  }

  transform(error: any): CxServerError {
    const message = 'CMS page not found';
    return new CmsPageNotFoundServerError({
      message,
      originalError: error,
    });
  }

  protected isHttpErrorResponse(error: any): error is HttpErrorResponse {
    return 'headers' in error;
  }
}
