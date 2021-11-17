import { CxEvent } from '../../../event/cx-event';

/**
 * Indicates that the user has logged out
 *
 * * The event is fired even for customer emulation
 * * The event is NOT fired for a ASM support agent authentication
 */
export class LogoutEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'LogoutEvent';
}

/**
 * Indicates that the user has logged in
 *
 * * The event is fired even for customer emulation
 * * The event is NOT fired for a ASM support agent authentication
 */
export class LoginEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'LoginEvent';
}
