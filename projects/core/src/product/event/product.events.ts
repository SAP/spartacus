import { CxEvent } from '../../event/cx-event';

/**
 * Indicates that a user select or unselect a facet value
 */
export class FacetChangedEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'FacetChangedEvent';
  /**
   * Facet code
   */
  code: string;
  /**
   * Facet name
   */
  name?: string;
  /**
   * Facet value code
   */
  valueCode: string;
  /**
   * Facet value name
   */
  valueName?: string;
  /**
   * Indicate whether facet value is toggled on or off
   */
  selected: boolean;
}
