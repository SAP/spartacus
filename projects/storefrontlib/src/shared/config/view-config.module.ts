import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

/**
 * @deprecated since 3.2
 *
 * Remove, don't use
 */
@NgModule({})
export class ViewConfigModule {
  static forRoot(): ModuleWithProviders<ViewConfigModule> {
    return {
      ngModule: ViewConfigModule,
      providers: [
        provideDefaultConfig({
          view: {},
        }),
      ],
    };
  }
}
