import { CxEvent } from '../../../event/cx-event';

/**
 * Indicates that the user has logged out
 */
export class LogoutEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'LogoutEvent';
}

/**
 * Indicates that the user has logged in
 */
export class LoginEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'LoginEvent';
}
