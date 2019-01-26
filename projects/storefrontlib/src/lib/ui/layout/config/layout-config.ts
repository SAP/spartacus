export enum BREAKPOINT {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg'
}

export abstract class LayoutConfig {
  breakpoints?: {
    [BREAKPOINT.xs]?: number;
    [BREAKPOINT.sm]?: number;
    [BREAKPOINT.md]?: number;
    [BREAKPOINT.lg]?: number;
  };
}
