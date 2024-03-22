import { Injectable, inject } from '@angular/core';
import { LoggerService } from '../../logger';
import { MultiErrorHandler } from './multi-error-handlers';

/**
 * An error handler that logs errors using a logger service.
 * Intended to be used as part of a multi-error handler strategy.
 *
 * @see MultiErrorHandler
 */
@Injectable({
  providedIn: 'root',
})
export class LoggingErrorHandler implements MultiErrorHandler {
  protected logger = inject(LoggerService);

  handleError(error: Error): void {
    this.logger.error(error);
  }
}
