import { Event } from '../../../event/event';

/**
 * Indicates that the user has logged out
 */
export class LogoutEvent extends Event {
  static type = 'LogoutEvent';
}
/**
 * Indicates that the user has logged in
 */
export class LoginEvent extends Event {
  static type = 'LoginEvent';
}
