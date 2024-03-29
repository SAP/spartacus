import { Injectable } from '@angular/core';
import { ServerErrorResponseTransformer } from './server-error-response-transformers';
import { CxServerError, UnknownServerError } from '../server-errors';
import { Priority } from '@spartacus/core';

/*
 * The UnknownServerErrorResponseTransformer transfroms into an UnknownServerError incoming HTTP error that occured during server-side rendering.
 *
 * This transformer is used as a fallback to handle any server error that
 * does not match any other transformer.
 */
@Injectable({
  providedIn: 'root',
})
export class UnknownServerErrorResponseTransformer
  implements ServerErrorResponseTransformer
{
  getPriority(): number {
    return Priority.FALLBACK;
  }

  hasMatch(): boolean {
    return true;
  }

  transform(error: any): CxServerError {
    const message = 'An unknown server error occurred';
    return new UnknownServerError({
      message,
      originalError: error,
    });
  }
}
