import { Action } from '@ngrx/store';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export const LOGOUT_CUSTOMER_SUPPORT_AGENT =
  '[Auth] Logout Customer Support Agent';

/**
 * @deprecated since 3.2, use asm lib instead
 *
 * Action dispatched after customer support agent logout. Used to clear store data (ui, search results)
 */
export class LogoutCustomerSupportAgent implements Action {
  readonly type = LOGOUT_CUSTOMER_SUPPORT_AGENT;
}
