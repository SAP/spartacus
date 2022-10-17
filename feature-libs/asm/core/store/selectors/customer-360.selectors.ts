import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getCustomer360DataLoaderState: MemoizedSelector<
  StateWithAsm,
  StateUtils.LoaderState<unknown>
> = createSelector(getAsmState, (state: AsmState) => state.customer360Response);

export const getCustomer360Data: MemoizedSelector<StateWithAsm, unknown> =
  createSelector(
    getCustomer360DataLoaderState,
    (state: StateUtils.LoaderState<unknown>) =>
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
