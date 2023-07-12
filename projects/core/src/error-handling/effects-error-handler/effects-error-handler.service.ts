import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { CxEffectError } from './cx-effect-error';

@Injectable()
export class EffectsErrorHandlerService {
  constructor(protected errorHandler: ErrorHandler) {}

  getAndHandleFailAction(effectError: CxEffectError) {
    if (effectError.error instanceof HttpErrorResponse) {
      return of('');
    }

    this.errorHandler.handleError(effectError.error);

    return of(effectError.action);
  }
}
