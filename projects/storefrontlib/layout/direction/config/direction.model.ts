/**
 * The ltr and rtl directions can be used to configure the storefront for a certain direction, both statically
 * or dynamically.
 *
 * The HTML5 "auto" value is not supported in Spartacus, as it's considered to be too fragile for the global
 * direction.
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
   * The default direction mode is used for the direction mode of the overall storefront. The default mode
   * can be used for all languages, but can be further enhanced dynamically by using the language detect mode.
   * The default mode will also be used in detect mode for those languages that are not listed in either
   * `rtlLanguages` or `ltrLanguages`.
   */
  default?: DirectionMode;

  /**
   * If detect is enabled, the direction is driven by the active language. The language is compared to the
   * list of configured `rtlLanguages` vs `ltrLanguages`. If no language is resolved, the default direction
   * mode is used.
   *
   * If no direction can be resolved, the direction is removed.
   */
  detect?: boolean;

  /**
   * The language isoCodes that are used to detect Right to Left languages.
   */
  rtlLanguages?: string[];

  /**
   * The language isoCodes that are used to detect Left to Right languages.
   */
  ltrLanguages?: string[];
}
