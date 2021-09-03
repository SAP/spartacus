import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { ComponentHandler } from './handlers/component-handler';
import { DefaultComponentHandler } from './handlers/default-component.handler';
import { LazyComponentHandler } from './handlers/lazy-component.handler';
import { InnerComponentsHostDirective } from './inner-components-host.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentWrapperDirective, InnerComponentsHostDirective],
  exports: [ComponentWrapperDirective, InnerComponentsHostDirective],
})
export class PageComponentModule {
  static forRoot(): ModuleWithProviders<PageComponentModule> {
    return {
      ngModule: PageComponentModule,
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
    };
  }
}
