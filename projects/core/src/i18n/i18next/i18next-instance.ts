import { InjectionToken } from '@angular/core';
import i18next, { i18n as I18Next } from 'i18next';

/**
 * The instance of i18next.
 *
 * Each SSR request gets its own instance of i18next.
 *
 * The reference to the static instance of `i18next` (`import i18next from 'i18next`)
 * should not be used anywhere else, because otherwise it would be shared in between all SSR requests.
 */
export const I18NEXT_INSTANCE = new InjectionToken<I18Next>(
  'Instance of i18next',
  {
    providedIn: 'root',
    factory: () => i18next.createInstance(),
  }
);
