/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createAction, props } from '@ngrx/store';
import { PointOfServiceNames } from '@spartacus/pickup-in-store/root';

export const LOAD_DEFAULT_POINT_OF_SERVICE =
  '[Default Point Of Service] Load Default Point Of Service';
export const LOAD_DEFAULT_POINT_OF_SERVICE_SUCCESS =
  '[Default Point Of Service] Load Default Point Of Service Success';
export const SET_DEFAULT_POINT_OF_SERVICE =
  '[Default Point Of Service] Set Default Point Of Service';

export const LoadDefaultPointOfService = createAction(
  LOAD_DEFAULT_POINT_OF_SERVICE
);

export const LoadDefaultPointOfServiceSuccess = createAction(
  LOAD_DEFAULT_POINT_OF_SERVICE_SUCCESS,
  props<{ payload: PointOfServiceNames }>()
);

export const SetDefaultPointOfService = createAction(
  SET_DEFAULT_POINT_OF_SERVICE,
  props<{ payload: PointOfServiceNames }>()
);
