import { StateUtils } from '@spartacus/core';
import { AccountSummaryActions } from '../actions';

export const accountSummaryInitialState = undefined;
export const accountSummarysInitialState = undefined;

export function accountSummaryEntitiesReducer(
  state = accountSummaryInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case AccountSummaryActions.LOAD_ACCOUNT_SUMMARY:
      console.log("ACCOUNT SUMMARY LOADED");
  }
  return state;
}

export function accountSummaryListReducer(
  state = accountSummarysInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case AccountSummaryActions.LOAD_ACCOUNT_SUMMARY_SUCCESS:
      console.log("ACCOUNT SUMMARY LOAD SUCCESS");
  }
  return state;
}
