import { PageEvent } from '../page/page.events';

/**
 * Indicates that a user visited a cart page.
 */
export class CartPageEvent extends PageEvent {
  /** event's type */
  static readonly type = 'CartPageEvent';
}
