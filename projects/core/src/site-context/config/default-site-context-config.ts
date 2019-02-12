import { SiteContextConfig } from './site-context-config';
import {
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID
} from '../providers/context-service-map';

export const defaultSiteContextConfigFactory: () => SiteContextConfig = () => ({
  siteContext: {
    parameters: {
      [LANGUAGE_CONTEXT_ID]: {
        persistence: 'route',
        defaultValue: 'en',
        values: ['en', 'de', 'ja', 'zh']
      },
      [CURRENCY_CONTEXT_ID]: {
        persistence: 'route',
        defaultValue: 'USD',
        values: ['USD', 'JPY']
      }
    },
    urlEncodingParameters: [LANGUAGE_CONTEXT_ID, CURRENCY_CONTEXT_ID]
  }
});
