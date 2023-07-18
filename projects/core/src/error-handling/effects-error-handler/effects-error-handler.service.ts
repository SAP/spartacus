import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

@Injectable()
export class EffectsErrorHandlerService {
  constructor(protected errorHandler: ErrorHandler) {}

  handleError(action: any): void {
    const error = this.getError(action);
    if (!(error instanceof HttpErrorResponse)) {
      this.errorHandler.handleError(error);
    }
  }

  filterActions(_action: Action): boolean {
    return false;
  }

  protected getError(action: any): any {
    if (action.error) {
      return action.error;
    } else if (action.payload?.error) {
      return action.payload.error;
    } else {
      return `Action error: ${action}`;
    }
  }
}
