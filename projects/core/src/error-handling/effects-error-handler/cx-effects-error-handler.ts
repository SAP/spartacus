/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorHandler } from '@angular/core';
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
    // tap({
    //   error:(error) => {
    //     if (errorHandler) {
    //       errorHandler.handleError(error);
    //     }
    //   }
    // })
  );
}
