import { CxEvent } from '../../event/cx-event';

/**
 * Indicates that a user has successfully placed an order
 */
export class OrderPlacedEvent extends CxEvent {
  static type = 'OrderPlacedEvent';
  code: string;
}
