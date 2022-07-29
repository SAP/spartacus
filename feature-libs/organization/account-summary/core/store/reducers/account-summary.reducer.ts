import { ListModel, StateUtils } from '@spartacus/core';
import { AccountSummary } from '../../../root/model/account-summary';
import { AccountSummaryActions } from '../actions';

export const accountSummaryInitialState: AccountSummary | undefined = undefined;
export const accountSummarysInitialState: ListModel | undefined = undefined;

export function accountSummaryEntitiesReducer(
  state = accountSummaryInitialState,
  action: StateUtils.LoaderAction
): AccountSummary | undefined {
  switch (action.type) {
    case AccountSummaryActions.LOAD_ACCOUNT_SUMMARY:
      console.log('ACCOUNT SUMMARY LOADED');
  }
  return state;
}

export function accountSummaryListReducer(
  state = accountSummarysInitialState,
  action: StateUtils.LoaderAction
): ListModel | undefined {
  switch (action.type) {
    case AccountSummaryActions.LOAD_ACCOUNT_SUMMARY_SUCCESS:
      console.log('ACCOUNT SUMMARY LOAD SUCCESS');
  }
  return state;
}
