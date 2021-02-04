/**
 * Window object enriched with a custom property. 
 * Intended to be used for specifying the data layer name.
 */
export interface WindowObject extends Window {
  [prop: string]: any;
}
