import { Injectable } from '@angular/core';
import { Config, DeferLoadingStrategy } from '@spartacus/core';
import { LaunchConfig } from '../launch-dialog/index';

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
   * The breakpoint configuration is used when the DOM is (re)rendered in specific view.
   * This allows for adaptive rendering, so that the DOM is rendered for specific breakpoints.
   */
  breakpoints?: {
    [BREAKPOINT.xs]?: number;
    [BREAKPOINT.sm]?: number;
    [BREAKPOINT.md]?: number;
    [BREAKPOINT.lg]?: number;
  };
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
