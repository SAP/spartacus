import { InjectionToken, Provider } from '@angular/core';

export const ConfigValidatorToken = new InjectionToken('ConfigurationGuard');

export type ConfigValidator = (config: any) => string | void;

export function provideConfigValidator(configGuard: ConfigValidator): Provider {
  return { provide: ConfigValidatorToken, useValue: configGuard, multi: true };
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
