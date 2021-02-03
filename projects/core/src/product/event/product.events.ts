/**
 * Indicates that a user select or unselect a facet value
 */
export class FacetChangedEvent {
  code: string;
  name?: string;
  valueCode: string;
  valueName?: string;
  selected: boolean;
}
