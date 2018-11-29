/**
 *
 * An interface representing CmsComponent.
 */
export interface CmsComponent {
  /**
   * @member {Date} [modifiedtime]
   */
  modifiedtime?: Date;
  /**
   * @member {string} [name]
   */
  name?: string;
  /**
   * @member {string} [typeCode]
   */
  typeCode?: string;
  /**
   * @member {string} [uid]
   */
  uid?: string;
}

export interface CmsLinkComponent extends CmsComponent {
  url?: string;
  container?: boolean;
  external?: boolean;
  contentPage?: string;
  contentPageLabelOrId?: string;
  linkName?: string;
  target?: boolean;
}

export interface CmsSearchBoxComponent extends CmsComponent {
  container?: boolean;
  maxSuggestions?: number;
  maxProducts?: number;
  displaySuggestions?: boolean;
  displayProducts?: boolean;
  displayProductImages?: boolean;
  waitTimeBeforeRequest?: number;
  minCharactersBeforeRequest?: number;
}
