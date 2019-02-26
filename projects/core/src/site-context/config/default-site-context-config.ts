import { SiteContextConfig } from './site-context-config';
import {
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID
} from '../providers/context-service-map';

export function defaultSiteContextConfigFactory(): SiteContextConfig {
  return {
    siteContext: {
      parameters: {
        [LANGUAGE_CONTEXT_ID]: {
          persistence: 'route',
          defaultValue: 'en',
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
            'pa'
          ]
        },
        [CURRENCY_CONTEXT_ID]: {
          persistence: 'route',
          defaultValue: 'USD',
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
            'ZAR'
          ]
        }
      }
    }
  };
}
