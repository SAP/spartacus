/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { HttpErrorModel } from '@spartacus/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EffectsErrorHandlerService {
  constructor(protected errorHandler: ErrorHandler) {}

  handleError(action: any): void {
    const error = this.getError(action);
    const isNotHttpError =
      !(error instanceof HttpErrorModel) &&
      !(error instanceof HttpErrorResponse);

    if (isNotHttpError) {
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
    } else if (action.payload) {
      return action.payload;
    } else {
      return `Action error: ${action?.type}`;
    }
  }
}
