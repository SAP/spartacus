/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { HttpErrorModel } from '@spartacus/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityFailAction } from '../../state/utils/entity-loader';
import { EntityScopedLoaderActions } from '../../state/utils/scoped-loader/entity-scoped-loader.actions';
import EntityScopedFailAction = EntityScopedLoaderActions.EntityScopedFailAction;

@Injectable()
export class EffectsErrorHandlerService {
  constructor(protected errorHandler: ErrorHandler) {}

  handleError(action: any): void {
    const error = this.getError(action);
    // Http errors are already handled in HttpErrorHandlerInterceptor.
    // To avoid duplicate errors we want to check if the error is not of type
    // HttpErrorModel or HttpErrorResponse.
    const isNotHttpError =
      !(error instanceof HttpErrorModel) &&
      !(error instanceof HttpErrorResponse);

    if (isNotHttpError) {
      this.errorHandler.handleError(error);
    }
  }

  /** Here we want to filter which error actions should be handled.
   * By default, we return standard Spartacus error actions */
  filterActions(action: Action): boolean {
    return (
      action instanceof EntityFailAction ||
      action instanceof EntityScopedFailAction
    );
  }

  /**
   * This function aims to extract an error message from
   * various NgRx action types. The error message is provided in different
   * ways depending on the given Action.
   * */
  protected getError(action: any): any {
    return (
      action.error ??
      action.payload?.error ??
      action.payload ??
      `Action error: ${action?.type}`
    );
  }
}
