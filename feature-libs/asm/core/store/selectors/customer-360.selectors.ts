/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AsmCustomer360Response } from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getCustomer360DataLoaderState: MemoizedSelector<
  StateWithAsm,
  StateUtils.LoaderState<AsmCustomer360Response>
> = createSelector(getAsmState, (state: AsmState) => state.customer360Response);

export const getCustomer360Data: MemoizedSelector<
  StateWithAsm,
  AsmCustomer360Response
> = createSelector(
  getCustomer360DataLoaderState,
  (state: StateUtils.LoaderState<AsmCustomer360Response>) =>
    StateUtils.loaderValueSelector(state)
);

export const getCustomer360DataLoading: MemoizedSelector<
  StateWithAsm,
  boolean
> = createSelector(
  getCustomer360DataLoaderState,
  (state: StateUtils.LoaderState<unknown>) =>
    StateUtils.loaderLoadingSelector(state)
);
