import { TemplateRef } from '@angular/core';

export enum PopoverPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface PopoverConfig {
  content: string | TemplateRef<any>;
  placement?: PopoverPosition;
}
