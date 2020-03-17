import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideDefaultConfig } from '../config/config.module';
import { PersonalizationConfig } from './config/personalization-config';
import { defaultPersonalizationConfig } from './config/default-personalization-config';

import { interceptors } from './http-interceptors/index';

@NgModule({
  providers: [{ provide: PersonalizationConfig, useExisting: Config }],
})
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
