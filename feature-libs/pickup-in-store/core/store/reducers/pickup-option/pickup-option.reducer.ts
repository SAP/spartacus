/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createReducer, on } from '@ngrx/store';
import { PickupOptionActions } from '../../actions';
import { PickupOptionState } from '../../pickup-option-state';

export const initialState: PickupOptionState['pickupOption'] = [];

export const pickupOptionReducer = createReducer(
  initialState,
  on(
    PickupOptionActions.SetPickupOption,
    (state: PickupOptionState['pickupOption'], { payload }) => {
      const newState = state.filter(
        (entry) => entry.entryNumber !== payload.entryNumber
      );
      return [...newState, payload];
    }
  ),
  on(
    PickupOptionActions.RemovePickupOption,
    (state: PickupOptionState['pickupOption'], { payload }) => {
      return state
        .filter((entry) => entry.entryNumber !== payload.entryNumber)
        .map((entry) => ({
          ...entry,
          entryNumber:
            entry.entryNumber > payload.entryNumber
              ? entry.entryNumber - 1
              : entry.entryNumber,
        }));
    }
  ),
  on(
    PickupOptionActions.RemoveAllPickupOptions,
    (_state: PickupOptionState['pickupOption']) => initialState
  )
);
