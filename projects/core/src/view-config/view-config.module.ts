import { ModuleWithProviders, NgModule } from '@angular/core';
import { ViewConfig } from './config/view-config';
import { provideConfig, Config } from '../config';
import { defaultScrollConfig } from '@spartacus/storefront';

@NgModule({})
export class ViewConfigModule {
  static forRoot(): ModuleWithProviders<ViewConfigModule> {
    return {
      ngModule: ViewConfigModule,
      providers: [
        provideConfig(<ViewConfig>defaultScrollConfig),
        {
          provide: ViewConfig,
          useExisting: Config,
        },
      ],
    };
  }
}
