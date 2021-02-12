import { TemplateRef } from '@angular/core';

export enum PopoverPosition {
  AUTO = 'auto',
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

export interface PopoverConfig {
  content: string | TemplateRef<any>;
  placement?: PopoverPosition;
  disable?: boolean;
}
