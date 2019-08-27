import { ModuleWithProviders, NgModule } from '@angular/core';
import { ViewConfig } from './config/view-config';
import { Config } from '../config';

@NgModule({})
export class ViewConfigModule {
  static forRoot(): ModuleWithProviders<ViewConfigModule> {
    return {
      ngModule: ViewConfigModule,
      providers: [
        {
          provide: ViewConfig,
          useExisting: Config,
        },
      ],
    };
  }
}
