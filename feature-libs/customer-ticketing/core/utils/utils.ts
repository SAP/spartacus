/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ErrorModel,
  OccHttpErrorType,
  OccHttpErrorReason,
  RoutingService
} from '@spartacus/core';
import {take} from 'rxjs/operators';

/**
 * Check if the returned error is of type notFound.
 */
export function isTicketNotFoundError(errorObj: [ErrorModel, RoutingService]): boolean {
  let currentSemanticRoute = '';
  const error = errorObj[0] as ErrorModel;

  (errorObj[1] as RoutingService).getRouterState()
    .pipe(take(1))
    .subscribe((routerState: any) => {
        currentSemanticRoute = routerState.state.semanticRoute;
      }
    );

  return (
    error.reason === OccHttpErrorReason.NOT_FOUND_ERROR &&
    error.type === OccHttpErrorType.NOT_FOUND_ERROR &&
    error.message !== undefined &&
    currentSemanticRoute === 'supportTicketDetails'
  );
}
