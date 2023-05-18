/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { OpfUi } from '@spartacus/opf/payment/root';
import { OpfState, StateWithOpf } from '../opf-state';
import { getOpfState } from './feature.selector';

export const getOpfUi: MemoizedSelector<StateWithOpf, OpfUi> = createSelector(
  getOpfState,
  (state: OpfState) => state.opfUi
);
