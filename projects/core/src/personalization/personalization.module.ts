import { ModuleWithProviders, NgModule } from '@angular/core';
import { defaultPersonalizationConfig } from './config/default-personalization-config';

import { interceptors } from './http-interceptors/index';
import { provideDefaultConfig } from '../config/config-providers';

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
