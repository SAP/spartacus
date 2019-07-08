import { SiteContextConfig } from './site-context-config';
import {
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../providers/context-ids';

export function defaultSiteContextConfigFactory(): SiteContextConfig {
  return {
    context: {
      [LANGUAGE_CONTEXT_ID]: [
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
      [CURRENCY_CONTEXT_ID]: [
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
  };
}
