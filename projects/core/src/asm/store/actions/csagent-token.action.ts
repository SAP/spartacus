import { Action } from '@ngrx/store';
import { LOGOUT_CUSTOMER_SUPPORT_AGENT } from '../../../auth/store/actions/login-logout.action';

export const SET_CSAGENT_TOKEN_DATA = '[Auth] Set CSAgent Token Data';

export class SetCSAgentTokenData implements Action {
  readonly type = SET_CSAGENT_TOKEN_DATA;
  // TODO: Type the payload
  constructor(public payload: any) {}
}

export class LogoutCustomerSupportAgent implements Action {
  readonly type = LOGOUT_CUSTOMER_SUPPORT_AGENT;
}

// action types
export type CustomerSupportAgentTokenAction =
  | SetCSAgentTokenData
  | LogoutCustomerSupportAgent;
