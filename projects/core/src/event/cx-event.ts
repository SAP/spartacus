/**
 * This generic CxEvent is intended to be inherited from any other Spartacus event.
 */
export abstract class CxEvent {
  /**
   * Event's type
   */
  static readonly type: string = 'CxEvent';
}
