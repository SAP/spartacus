export * from './page-slot/page-slot.component';
export * from './page-slot/component-wrapper.directive';

import { PageSlotComponent } from './page-slot/page-slot.component';
import { ComponentWrapperDirective } from './page-slot/component-wrapper.directive';

export const components: any[] = [PageSlotComponent, ComponentWrapperDirective];
