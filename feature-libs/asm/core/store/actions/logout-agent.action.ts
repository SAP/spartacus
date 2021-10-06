import { Action } from '@ngrx/store';

export const LOGOUT_CUSTOMER_SUPPORT_AGENT =
  '[Auth] Logout Customer Support Agent';

/**
 * Action dispatched after customer support agent logout. Used to clear store data (ui, search results)
 */
export class LogoutCustomerSupportAgent implements Action {
  readonly type = LOGOUT_CUSTOMER_SUPPORT_AGENT;
}
