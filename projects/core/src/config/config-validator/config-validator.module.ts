import {
  APP_INITIALIZER,
  isDevMode,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { ConfigInitializerService } from '../config-initializer/config-initializer.service';
import {
  ConfigValidator,
  ConfigValidatorToken,
  validateConfig,
} from './config-validator';

export function configValidatorFactory(
  configInitializer: ConfigInitializerService,
  validators: ConfigValidator[]
) {
  const validate = () => {
    if (isDevMode()) {
      configInitializer
        .getStableConfig()
        .then(config => validateConfig(config, validators || []));
    }
  };
  return validate;
}

@NgModule()
export class ConfigValidatorModule {
  static forRoot(): ModuleWithProviders<ConfigValidatorModule> {
    return {
      ngModule: ConfigValidatorModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: configValidatorFactory,
          deps: [
            ConfigInitializerService,
            [new Optional(), ConfigValidatorToken],
          ],
        },
      ],
    };
  }
}
