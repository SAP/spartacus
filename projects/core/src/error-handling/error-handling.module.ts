/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CxErrorHandler } from './cx-error-handler';
import { EFFECTS_ERROR_HANDLER } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function cxEffectsErrorHandler<T extends Action>(
  observable$: Observable<T>,
  errorHandler: ErrorHandler
): Observable<T> {
  return observable$.pipe(
    // @ts-ignore
    catchError((error) => {
      if (errorHandler) {
        errorHandler.handleError(error);
      }
    })
  );
}

@NgModule()
export class ErrorHandlingModule {
  static forRoot(): ModuleWithProviders<ErrorHandlingModule> {
    return {
      ngModule: ErrorHandlingModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: CxErrorHandler,
        },
        {
          provide: EFFECTS_ERROR_HANDLER,
          useValue: cxEffectsErrorHandler,
        },
      ],
    };
  }
}
