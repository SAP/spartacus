import { ModuleWithProviders, NgModule } from '@angular/core';
import { ViewConfig } from './view-config';
import { Config, provideConfig } from '@spartacus/core';

@NgModule({})
export class ViewConfigModule {
  static forRoot(): ModuleWithProviders<ViewConfigModule> {
    return {
      ngModule: ViewConfigModule,
      providers: [
        provideConfig({
          view: {},
        }),
        {
          provide: ViewConfig,
          useExisting: Config,
        },
      ],
    };
  }
}
