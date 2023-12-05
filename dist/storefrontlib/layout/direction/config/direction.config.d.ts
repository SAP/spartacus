import { Direction } from './direction.model';
import * as i0 from "@angular/core";
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
export declare abstract class DirectionConfig {
    direction?: Direction;
    static ɵfac: i0.ɵɵFactoryDeclaration<DirectionConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DirectionConfig>;
}
declare module '@spartacus/core' {
    interface Config extends DirectionConfig {
    }
}
