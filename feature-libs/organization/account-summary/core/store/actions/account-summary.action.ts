import { StateUtils } from '@spartacus/core';
import { ACCOUNT_SUMMARY_ENTITIES } from 'feature-libs/organization/administration/core/store/organization-state';

export const LOAD_ACCOUNT_SUMMARY = '[AccountSummary] Load Account Summary';
export const LOAD_ACCOUNT_SUMMARY_FAIL = '[AccountSummary] Load Account Summary Data Fail';
export const LOAD_ACCOUNT_SUMMARY_SUCCESS = '[AccountSummary] Load Account Summary Data Success';

export class LoadAccountSummary extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ACCOUNT_SUMMARY;
  constructor(public payload: { userId: string; budgetCode: string }) {
    super(ACCOUNT_SUMMARY_ENTITIES, payload.budgetCode);
    console.log(this.type);
  }
}

export class LoadAccountSummaryFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_FAIL;
  constructor(public payload: { budgetCode: string; error: any }) {
    super(ACCOUNT_SUMMARY_ENTITIES, payload.budgetCode, payload.error);
    console.log(this.type);

  }
}

export class LoadAccountSummarySuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_SUCCESS;
  constructor(public payload: { id: string; error: any }) {
    super(ACCOUNT_SUMMARY_ENTITIES, payload.id);
    console.log(this.type);
  }
}


export type AccountSummaryAction =
  | LoadAccountSummary
  | LoadAccountSummaryFail
  | LoadAccountSummarySuccess;

