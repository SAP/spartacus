import { CxEvent } from '../../event/cx-event';

/**
 * Indicates that a user has successfully placed an order
 */
export class OrderPlacedEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'OrderPlacedEvent';
  /**
   * Order code
   */
  code: string;
}
