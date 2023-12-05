import { InjectionToken } from '@angular/core';
import { LoggerModule } from 'i18next';
/**
 * The logger plugin for i18next that delegates logging to the Spartacus LoggerService.
 * The logger plugin is used to log i18next events.
 * See more: https://www.i18next.com/misc/creating-own-plugins#logger
 */
export declare const I18NEXT_LOGGER_PLUGIN: InjectionToken<LoggerModule>;
