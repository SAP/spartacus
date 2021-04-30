import { CxEvent } from '../../event/cx-event';

/**
 * Indicates that a user has successfully placed an order
 *
 * @deprecated since 4.0, use checkout feature lib instead.
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
