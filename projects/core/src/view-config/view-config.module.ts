import { ModuleWithProviders, NgModule } from '@angular/core';
import { ViewConfig } from './config/view-config';
import { provideConfig, Config } from '../config';
import { defaultScrollConfig } from 'projects/storefrontlib/src/cms-components/product/config/default-scroll-config';

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
