import { InjectionToken, Provider } from '@angular/core';
import { LoggerService } from '../../logger';
import { Config } from '../config-tokens';
export declare const ConfigValidatorToken: InjectionToken<unknown>;
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
export declare function provideConfigValidator(configValidator: ConfigValidator): Provider;
export declare function validateConfig(config: Config, configValidators: ConfigValidator[], logger?: LoggerService): void;
