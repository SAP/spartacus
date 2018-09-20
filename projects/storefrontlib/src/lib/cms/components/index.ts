export * from './dynamic-slot/dynamic-slot.component';
export * from './dynamic-slot/component-wrapper.directive';

import { DynamicSlotComponent } from './dynamic-slot/dynamic-slot.component';
import { ComponentWrapperDirective } from './dynamic-slot/component-wrapper.directive';

export const components: any[] = [
  DynamicSlotComponent,
  ComponentWrapperDirective
];
