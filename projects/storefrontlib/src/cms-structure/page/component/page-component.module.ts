import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { ComponentHandler } from './handlers/component-handler';
import { DefaultComponentHandler } from './handlers/default-component.handler';
import { LazyComponentHandler } from './handlers/lazy-component.handler';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ComponentHandler,
      useExisting: DefaultComponentHandler,
      multi: true,
    },
    {
      provide: ComponentHandler,
      useExisting: LazyComponentHandler,
      multi: true,
    },
  ],
  declarations: [ComponentWrapperDirective],
  exports: [ComponentWrapperDirective],
})
export class PageComponentModule {}
