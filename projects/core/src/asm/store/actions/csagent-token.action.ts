import { StateLoaderActions } from '../../../state/utils/index';
import { UserToken } from '../../../auth/models/token-types.model';
import { CSAGENT_TOKEN_DATA } from '../asm-state';
import { Action } from '@ngrx/store';
import { LOGOUT_CUSTOMER_SUPPORT_AGENT } from '../../../auth/store/actions/login-logout.action';

export const LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN =
  '[Auth] Load Customer Service Agent Token';
export const LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL =
  '[Auth] Load Customer Service Agent Token Fail';
export const LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS =
  '[Auth] Load Customer Service Agent Token Success';

export class LoadCustomerSupportAgentToken extends StateLoaderActions.LoaderLoadAction {
  readonly type = LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN;

  constructor(public payload: { userId: string; password: string }) {
    super(CSAGENT_TOKEN_DATA);
  }
}

export class LoadCustomerSupportAgentTokenFail extends StateLoaderActions.LoaderFailAction {
  readonly type = LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL;
  constructor(public payload: any) {
    super(CSAGENT_TOKEN_DATA);
  }
}

export class LoadCustomerSupportAgentTokenSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS;
  constructor(public payload: UserToken) {
    super(CSAGENT_TOKEN_DATA);
  }
}

export class LogoutCustomerSupportAgent implements Action {
  readonly type = LOGOUT_CUSTOMER_SUPPORT_AGENT;
}

// action types
export type CustomerSupportAgentTokenAction =
  | LoadCustomerSupportAgentToken
  | LoadCustomerSupportAgentTokenFail
  | LoadCustomerSupportAgentTokenSuccess
  | LogoutCustomerSupportAgent;
