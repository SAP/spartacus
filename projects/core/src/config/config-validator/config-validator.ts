import { InjectionToken, Provider } from '@angular/core';
import { Config } from '../config-tokens';

export const ConfigValidatorToken = new InjectionToken(
  'ConfigurationValidator'
);

/**
 * ConfigValidator is used to validate config and display warning messages in development mode.
 *
 * In case of failed validation, should return a string with error message.
 */
export type ConfigValidator = (config: Config) => string | void;

/**
 * Use to probide config validation at app bootstrap (when all config chunks are merged)
 *
 * @param configValidator
 */
export function provideConfigValidator(
  configValidator: ConfigValidator
): Provider {
  return {
    provide: ConfigValidatorToken,
    useValue: configValidator,
    multi: true,
  };
}

export function validateConfig(
  config: Config,
  configValidators: ConfigValidator[]
) {
  for (const validate of configValidators) {
    const warning = validate(config);
    if (warning) {
      console.warn(warning);
    }
  }
}
