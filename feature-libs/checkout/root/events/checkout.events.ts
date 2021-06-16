import { CxEvent } from '@spartacus/core';

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
