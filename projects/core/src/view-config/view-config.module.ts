import { ModuleWithProviders, NgModule } from '@angular/core';
import { ViewConfig } from './config/view-config';
import { provideConfig, Config } from '../config';

@NgModule({})
export class ViewConfigModule {
  static forRoot(): ModuleWithProviders<ViewConfigModule> {
    return {
      ngModule: ViewConfigModule,
      providers: [
        provideConfig(<ViewConfig>{
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
