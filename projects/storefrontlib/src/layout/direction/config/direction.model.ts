/**
 * Holds the `rtl` or `ltr` direction.
 */
export enum DirectionMode {
  /**
   * Indicates Left to Right direction.
   */
  LTR = 'ltr',
  /**
   * Indicates Right to Left direction.
   */
  RTL = 'rtl',
}

/**
 * Contains the configuration mode for language driven directionality. The detect mode is recommended
 * for a multi-site or multi-lingual setup where the active language should dictate the direction mode.
 */
export interface Direction {
  /**
   * The default direction mode is used for the direction mode of the storefront. The default mode can be used
   * for all languages, but if you enable the detect mode, the default mode is used as a fallback for all
   * languages which are not listed in `rtlLanguages` or `ltrLanguages`.
   */
  default?: DirectionMode;

  /**
   * Detects the direction based on the active language. The active language is compared to the list of
   * configured `rtlLanguages` vs `ltrLanguages`. If no language is resolved, the default direction mode
   * is used.
   */
  detect?: boolean;

  /**
   * The language isoCodes that will be used for Right to Left direction if the detect mode is enabled.
   */
  rtlLanguages?: string[];

  /**
   * The language isoCodes that will be used for Left to Right direction if the detect mode is enabled.
   */
  ltrLanguages?: string[];
}
