import { Action } from '@ngrx/store';
import { UserToken } from '../../models/token-types.model';

export const LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN =
  '[Auth] Load Customer Service Agent Token';
export const LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL =
  '[Auth] Load Customer Service Agent Token Fail';
export const LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS =
  '[Auth] Load Customer Service Agent Token Success';

export class LoadCustomerSupportAgentToken implements Action {
  readonly type = LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN;
  constructor(public payload: { userId: string; password: string }) {}
}

export class LoadCustomerSupportAgentTokenFail implements Action {
  readonly type = LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL;
  constructor(public payload: any) {}
}

export class LoadCustomerSupportAgentTokenSuccess implements Action {
  readonly type = LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS;
  constructor(public payload: UserToken) {}
}

// action types
export type CustomerSupportAgentTokenAction =
  | LoadCustomerSupportAgentToken
  | LoadCustomerSupportAgentTokenFail
  | LoadCustomerSupportAgentTokenSuccess;
