import { CxEvent } from '../../event/cx-event';

/**
 * Indicates that a user select or unselect a facet value
 */
export class FacetChangedEvent extends CxEvent {
  code: string;
  name?: string;
  valueCode: string;
  valueName?: string;
  selected: boolean;
}
