/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createAction, props } from '@ngrx/store';

export const ADD_BROWSER_LOCATION = '[Pickup Locations] Add Browser Location';

export type AddBrowserLocationProps = {
  longitude: number;
  latitude: number;
};

export const AddBrowserLocation = createAction(
  ADD_BROWSER_LOCATION,
  props<{ payload: AddBrowserLocationProps }>()
);
