import {
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../providers/context-service-map';
import { ContextPersistence, SiteContextConfig } from './site-context-config';

export function defaultSiteContextConfigFactory(): SiteContextConfig {
  return {
    context: {
      parameters: {
        [LANGUAGE_CONTEXT_ID]: {
          persistence: ContextPersistence.ROUTE,
          default: 'en',
          values: [
            'en',
            'de',
            'ja',
            'zh',
            'ru',
            'fr',
            'tr',
            'it',
            'es',
            'uk',
            'pl',
            'nl',
            'hi',
            'ar',
            'pt',
            'bn',
            'pa',
          ],
        },
        [CURRENCY_CONTEXT_ID]: {
          persistence: ContextPersistence.ROUTE,
          default: 'USD',
          values: [
            'USD',
            'EUR',
            'JPY',
            'GBP',
            'AUD',
            'CAD',
            'CHF',
            'CNY',
            'SEK',
            'NZD',
            'MXN',
            'SGD',
            'HKD',
            'NOK',
            'KRW',
            'TRY',
            'RUB',
            'INR',
            'BRL',
            'ZAR',
          ],
        },
      },
    },
  };
}
