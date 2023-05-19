import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, Provider } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { PROPAGATE_ERROR } from '@spartacus/core';

// class late error propagator

@Injectable({ providedIn: 'root' })
export class LateErrorPropagator {
  protected propagateError = inject(PROPAGATE_ERROR, { skipSelf: true }); // take from parent (platform) injector

  protected errors: Array<Error | HttpErrorResponse> = [];
  saveError(err: Error | HttpErrorResponse) {
    this.errors.push(err);
  }

  propagateErrors() {
    if (this.errors.length) {
      this.propagateError(this.errors[0]); // SPIKE TODO decide: only 1 error or all?
    }
  }
}

export const provideLateErrorPropagator: Provider[] = [
  {
    provide: BEFORE_APP_SERIALIZED,
    multi: true,
    useFactory: () => {
      const lateErrorPropagator = inject(LateErrorPropagator);
      return () => lateErrorPropagator.propagateErrors();
    },
  },
  {
    provide: PROPAGATE_ERROR,
    useFactory: () => {
      const lateErrorPropagator = inject(LateErrorPropagator);
      return (err: Error | HttpErrorResponse) =>
        lateErrorPropagator.saveError(err);
    },
  },
];
