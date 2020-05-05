import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config.module';
import { defaultPersonalizationConfig } from './config/default-personalization-config';

import { interceptors } from './http-interceptors/index';

@NgModule({})
export class PersonalizationModule {
  static forRoot(): ModuleWithProviders<PersonalizationModule> {
    return {
      ngModule: PersonalizationModule,
      providers: [
        provideDefaultConfig(defaultPersonalizationConfig),
        ...interceptors,
      ],
    };
  }
}
