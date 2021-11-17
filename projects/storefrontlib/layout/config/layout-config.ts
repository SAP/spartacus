import { Injectable } from '@angular/core';
import { Config, DeferLoadingStrategy } from '@spartacus/core';
import { LaunchConfig } from '../launch-dialog/index';

/**
 * The `BREAKPOINT` typing defaults to five default screen names:
 * xs, sm, md, lg, xl.
 *
 * The type can be extended to allow for custom screens, such as XLL or `tablet`.
 *
 * While the screen names are fully configurable, other features might have
 * pre-configured layout settings per screen. Page layouts or table configurations,
 * for example, are driven by screen size. In case you change the screen size or
 * introduce new screen names, you might loose out on these configurations.
 */
export enum BREAKPOINT {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export type LayoutSections =
  | 'header'
  | 'footer'
  | 'LandingPage2Template'
  | string;

export type SlotConfig = {
  /** The cms page slots are mapped by the `slot.position`. */
  slots?: string[];

  /**
   * The page fold identifies the last expected page slot above-the-fold.
   * It's perfectly fine to specify this by indication, but keep in mind that
   * a more precise indication will gain a more positive impact on performance.
   */
  pageFold?: string;
};

export type SlotGroup = {
  /** The page slot configuration for large screens */
  [BREAKPOINT.lg]?: SlotConfig;
  /** The page slot configuration for medium screens */
  [BREAKPOINT.md]?: SlotConfig;
  /** The page slot configuration for small screens */
  [BREAKPOINT.sm]?: SlotConfig;
  /** The page slot configuration for extra small screens */
  [BREAKPOINT.xs]?: SlotConfig;
};

export type LayoutSlotConfig = {
  [section in LayoutSections]: SlotConfig | SlotGroup | LayoutSlotConfig;
};

export interface BreakPoint {
  /**
   * The minimum screen width.
   */
  min?: number;

  /**
   * The minimum screen width.
   */
  max?: number;
}

/**
 * The `LayoutBreakPoints` can be used to configure the size of a specific screen. The screen
 * are defined by breakpoints, with a min and/or max value. The breakpoint size is in pixels,
 * hence a numeric value is expected.
 */
export type LayoutBreakPoints = {
  [t in BREAKPOINT]?: number | BreakPoint;
};

/**
 * The LayoutConfig supports the configuration of page slots by page templates
 * or page sections, such as headers and footers. The configuration also supports
 * adaptive design per breakpoint (not per device type), so that the DOM is (re)rendered
 * por a given breakpoint.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class LayoutConfig {
  /**
   * The breakpoint configuration is used to defined various screens. A specific screen name can
   * be used to further configure certain features, such as the overall layout or specific
   * component configurations.
   */
  breakpoints?: LayoutBreakPoints;

  layoutSlots?: LayoutSlotConfig;

  /**
   * Deferred loading is a technique to hold of with the loading / creation
   * of DOM elements which are not not in the initial view port.
   * This technique wil increase performance.
   */
  deferredLoading?: {
    /**
     * The global strategy will be used as a fallback strategy for all DOM creation,
     * but can be overridden by local configuration, i.e. for cms components.
     */
    strategy?: DeferLoadingStrategy;
    /**
     * The intersection margin contains the offset used by the Intersection Observer
     * to observe elements outside the view port.
     *
     * See https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
     */
    intersectionMargin?: string;
  };

  launch?: LaunchConfig;
}

declare module '@spartacus/core' {
  interface Config extends LayoutConfig {}
}
