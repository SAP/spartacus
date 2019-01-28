export enum BREAKPOINT {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl'
}

export type LayoutSections =
  | 'header'
  | 'footer'
  | 'LandingPage2Template'
  | string;

export type SlotGroup = {
  slots?: string[];
  lg?: string[];
  md?: string[];
  sm?: string[];
  xs?: string[];
};

export type LayoutSlotConfig = {
  [section in LayoutSections]: SlotGroup | LayoutSlotConfig
};

export abstract class LayoutConfig {
  breakpoints?: {
    [BREAKPOINT.xs]?: number;
    [BREAKPOINT.sm]?: number;
    [BREAKPOINT.md]?: number;
    [BREAKPOINT.lg]?: number;
  };
  layoutSlots?: LayoutSlotConfig;
}
