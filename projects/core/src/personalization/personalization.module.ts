import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultPersonalizationConfig } from './config/default-personalization-config';
import { interceptors } from './http-interceptors/index';

/**
 * @deprecated since 3.2, use @spartacus/tracking/personalization instead
 */
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
