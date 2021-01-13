import { CxEvent } from '../../event/event';

/**
 * Indicates that a user has successfully placed an order
 */
export class OrderPlacedEvent extends CxEvent {
  static type = 'OrderPlacedEvent';
  code: string;
}
