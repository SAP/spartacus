import { CxEvent } from '../../../event/event';

/**
 * Indicates that the user has logged out
 */
export class LogoutEvent extends CxEvent {
  static type = 'LogoutEvent';
}
/**
 * Indicates that the user has logged in
 */
export class LoginEvent extends CxEvent {
  static type = 'LoginEvent';
}
