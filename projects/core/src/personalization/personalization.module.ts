import { ModuleWithProviders, NgModule } from '@angular/core';

import { Config, ConfigModule } from '../config/config.module';
import { defaultPersonalizationConfig } from './config/default-personalization-config';
import { PersonalizationConfig } from './config/personalization-config';
import { interceptors } from './http-interceptors/index';

@NgModule({
  imports: [ConfigModule.withConfig(defaultPersonalizationConfig)],
  providers: [{ provide: PersonalizationConfig, useExisting: Config }],
})
export class PersonalizationModule {
  static forRoot(): ModuleWithProviders<PersonalizationModule> {
    return {
      ngModule: PersonalizationModule,
      providers: [...interceptors],
    };
  }
}
