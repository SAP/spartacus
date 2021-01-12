/**
 * Indicates that a user has successfully placed an order
 */
export class OrderPlacedEvent {
  static type = 'OrderPlacedEvent';
  code: string;
}
