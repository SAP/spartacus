import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { Direction } from './direction.model';

/**
 * The direction config provides an easy way to configure "ltr" versus "rtl" direction
 * for the storefront. The direction can be configured to detect the direction by language.
 *
 * The following configuration detects rtl languages by isoCode for Arabic and Hebrew:
 *
 * ```typescript
 * direction: {
 *   detect: true,
 *   default: DirectionMode.LTR,
 *   rtlLanguages: ['ar', 'he']
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class DirectionConfig {
  direction?: Direction;
}

declare module '@spartacus/core' {
  interface Config extends DirectionConfig {}
}
