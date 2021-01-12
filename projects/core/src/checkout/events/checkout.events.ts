/**
 * Indicates that a user has successfully placed an order
 */
export class OrderPlacedEvent {
  static readonly type = 'OrderPlacedEvent';
  code: string;
}
