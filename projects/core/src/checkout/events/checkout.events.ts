import { Event } from '../../event/event';

/**
 * Indicates that a user has successfully placed an order
 */
export class OrderPlacedEvent extends Event {
  static type = 'OrderPlacedEvent';
  code: string;
}
