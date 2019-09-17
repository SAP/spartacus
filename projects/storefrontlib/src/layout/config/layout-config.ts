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
 * adaptive design per breadpoint (not per device type), so that the DOM is (re)rendered
 * por a given breakpoint.
 */
export abstract class LayoutConfig {
  /** The breakpoint configuration is used when the DOM is (re)rendered in specific view.
   * This allows for adaptive rendering, so that the DOM is rendered for specific breakpoints. */
  breakpoints?: {
    [BREAKPOINT.xs]?: number;
    [BREAKPOINT.sm]?: number;
    [BREAKPOINT.md]?: number;
    [BREAKPOINT.lg]?: number;
  };
  layoutSlots?: LayoutSlotConfig;
}
