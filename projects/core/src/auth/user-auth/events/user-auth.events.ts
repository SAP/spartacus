import { CxEvent } from '../../../event/cx-event';

/**
 * Indicates that the user has logged out
 */
export class LogoutEvent extends CxEvent {
  static readonly type = 'LogoutEvent';
}

/**
 * Indicates that the user has logged in
 */
export class LoginEvent extends CxEvent {
  static readonly type = 'LoginEvent';
}
