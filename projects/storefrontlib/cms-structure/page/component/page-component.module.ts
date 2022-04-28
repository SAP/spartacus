import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { ComponentsContextDirective } from './context/component-context.directive';
import { ComponentHandler } from './handlers/component-handler';
import { DefaultComponentHandler } from './handlers/default-component.handler';
import { LazyComponentHandler } from './handlers/lazy-component.handler';
import { InnerComponentsHostDirective } from './inner-components-host.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ComponentWrapperDirective,
    InnerComponentsHostDirective,
    ComponentsContextDirective,
  ],
  exports: [
    ComponentWrapperDirective,
    InnerComponentsHostDirective,
    ComponentsContextDirective,
  ],
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
