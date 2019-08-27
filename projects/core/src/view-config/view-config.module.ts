import { ModuleWithProviders, NgModule } from '@angular/core';
import { ViewConfig } from './config/view-config';
import { Config, provideConfig } from '../config';

@NgModule({})
export class ViewConfigModule {
  static forRoot(): ModuleWithProviders<ViewConfigModule> {
    return {
      ngModule: ViewConfigModule,
      providers: [
        provideConfig({
          view: {
            infiniteScroll: {
              active: true,
            },
          },
        }),
        {
          provide: ViewConfig,
          useExisting: Config,
        },
      ],
    };
  }
}
