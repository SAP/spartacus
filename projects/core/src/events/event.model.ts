/**
 * CxEvent model holds the value of the event source
 * and can potential be extended with meta info to the
 * event.
 */
export class CxEvent<T> {
  /**
   * The value object related to the event source.
   * This value typically reprents the internal state of
   * the event source.
   *
   * Example:
   * In case of a cart related event, the value will represent the
   * cart data for the cart of relevant cart line.
   */
  value?: T;

  /**
   * The mouse interaction which contribute to the event, if any.
   */
  mouseEvent?: MouseEvent;

  /**
   * The number of listeners to the event.
   */

  listeners?: number;
}
