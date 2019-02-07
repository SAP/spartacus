import { SiteContextConfig } from './site-context-config';

export const defaultSiteContextConfig: SiteContextConfig = {
  siteContext: {
    parameters: {
      language: {
        persistence: 'route',
        defaultValue: 'en',
        values: ['en', 'de', 'ja', 'zh']
      },
      currency: {
        persistence: 'route',
        defaultValue: 'USD',
        values: ['USD', 'JPY']
      }
    },
    urlEncodingParameters: ['language', 'currency']
  }
};
