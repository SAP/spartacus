import { Action } from '@ngrx/store';

export const LOGOUT_CUSTOMER_SUPPORT_AGENT =
  '[Auth] Logout Customer Support Agent';

export class LogoutCustomerSupportAgent implements Action {
  readonly type = LOGOUT_CUSTOMER_SUPPORT_AGENT;
}
