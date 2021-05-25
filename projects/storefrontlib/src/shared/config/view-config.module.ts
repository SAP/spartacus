import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

/**
 * @deprecated since 3.1
 *
 * TODO: remove in 4.0
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
