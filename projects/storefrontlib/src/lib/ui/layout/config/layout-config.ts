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

export type SlotConfig = {
  slots?: string[];
};

export type SlotGroup = {
  [BREAKPOINT.lg]?: SlotConfig;
  [BREAKPOINT.md]?: SlotConfig;
  [BREAKPOINT.sm]?: SlotConfig;
  [BREAKPOINT.xs]?: SlotConfig;
};

export type LayoutSlotConfig = {
  [section in LayoutSections]: SlotConfig | SlotGroup | LayoutSlotConfig
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
