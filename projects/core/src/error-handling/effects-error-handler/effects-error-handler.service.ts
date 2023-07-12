/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { CxEffectError } from './cx-effect-error';

@Injectable()
export class EffectsErrorHandlerService {
  constructor(protected errorHandler: ErrorHandler) {}

  getAndHandleFailAction(effectError: CxEffectError) {
    if ((effectError.error instanceof HttpErrorResponse)) {
      // throw effectError.error;
      this.errorHandler.handleError(effectError.error);
    }

    return of(effectError.action);
  }
}
