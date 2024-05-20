/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createAction } from '@ngrx/store';

export const TOGGLE_HIDE_OUT_OF_STOCK_OPTIONS =
  '[Stock] Toggle Hide Out Of Stock Options';

export const ToggleHideOutOfStockOptionsAction = createAction(
  TOGGLE_HIDE_OUT_OF_STOCK_OPTIONS
);
