import { InjectionToken, Provider } from '@angular/core';

export const ConfigValidatorToken = new InjectionToken(
  'ConfigurationValidator'
);

export type ConfigValidator = (config: any) => string | void;

export function provideConfigValidator(
  configValidator: ConfigValidator
): Provider {
  return {
    provide: ConfigValidatorToken,
    useValue: configValidator,
    multi: true
  };
}

export function validateConfig(
  config: any,
  configValidators: ConfigValidator[]
) {
  for (const validate of configValidators) {
    const warning = validate(config);
    if (warning) {
      console.warn(warning);
    }
  }
}
