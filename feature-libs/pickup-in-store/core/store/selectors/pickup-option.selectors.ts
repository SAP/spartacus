/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PickupOption } from '@spartacus/pickup-in-store/root';
import {
  PickupOptionState,
  StateWithPickupOption,
} from '../pickup-option-state';
import { getPickupOptionState } from './feature.selectors';

export const getPageContext = (): MemoizedSelector<
  StateWithPickupOption,
  string
> =>
  createSelector(
    getPickupOptionState,
    (state: PickupOptionState) => state.pageContext
  );

export const getPickupOption = (
  entryNumber: number
): MemoizedSelector<StateWithPickupOption, PickupOption | undefined> =>
  createSelector(getPickupOptionState, (state: PickupOptionState) => {
    return state.pickupOption.find((entry) => entry.entryNumber === entryNumber)
      ?.pickupOption;
  });
