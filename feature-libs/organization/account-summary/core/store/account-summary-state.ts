import { StateUtils } from '@spartacus/core';
import { AccountSummary } from '../../root/model/account-summary';

export const ACCOUNT_SUMMARY_FEATURE = 'accountSummary';

export const ACCOUNT_SUMMARY_ENTITIES = 'accountSummary-entities';
export const ACCOUNT_SUMMARY_LIST = 'accountSummary-list';

export interface AccountSummaryManagement
  extends StateUtils.EntityListState<AccountSummary> { }

export interface AccountSummaryState {
  [ACCOUNT_SUMMARY_FEATURE]: AccountSummaryManagement;
}
