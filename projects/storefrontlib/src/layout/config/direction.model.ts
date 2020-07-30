/**
 * The DirectionMode can be used to configure the html direction (i.e. `<html dir="rtl">`) directly or
 * let the browser or Spartacus _detect_ the direction based on the given text or language.
 */
export enum DirectionMode {
  /**
   * The auto value is used by browsers to automatically detect the direction based on the first
   * text occurrence. This can be considered too fragile, as the fallback text feature of the backend
   * or any hardcoded text might end up with a combination of rtl and ltr text.
   */

  AUTO = 'auto',
  /**
   * Explicit usage of `ltr` (Left To Right) is useful for a single site / single language setup. The direction
   * can be set during build time and doesn't need to be adjusted for a specific site or language context. Whenever
   * the site or language can be changed at runtime, the `DETECT` or `AUTO` value is recommended.
   */
  LTR = 'ltr',

  /**
   * Explicit usage of `rtl` (Right To Left) is useful for a single site / single language setup. The direction
   * can be set during build time and doesn't need to be adjusted for a specific site or language context. Whenever
   * the site or language can be changed at runtime, the `DETECT` or `AUTO` value is recommended.
   */
  RTL = 'rtl',
}

/**
 * Contains the default direction mode detect features for directionality. The auto detect feature is useful
 * for a multi-site or multi-lingual setup where the active language should dictate the direction mode.
 */
export interface LayoutDirection {
  /**
   * The direction mode is used to set the default direction for the global HTML.
   */
  mode?: DirectionMode;

  /**
   * Detects the direction based on the active language and the configured list of `rtl` vs `ltr` languages.
   */
  detect?: boolean;

  /**
   * The language isoCodes that will be mapped to RTL in case the `DirectionMode` is set to  `DirectionMode.DETECT`.
   */
  rtlLanguages?: string[];
  /**
   * The language isoCodes that will be mapped to LTR in case the `DirectionMode` is set to  `DirectionMode.DETECT`.
   */
  ltrLanguages?: string[];
}
