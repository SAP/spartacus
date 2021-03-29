/**
 * Intended to be inherited by all other Spartacus' events.
 *
 * "One event to rule them all".
 */
export abstract class CxEvent {
  /**
   * Event's type
   */
  static readonly type: string = 'CxEvent';
}
