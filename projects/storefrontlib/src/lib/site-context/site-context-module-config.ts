export interface SiteContextConfig {
  server?: {
    baseUrl?: string,
    occPrefix?: string
  };

  site?: {
    baseSite?: string,
    language?: string,
    currency?: string
  };

}

export const defaultConfig: SiteContextConfig = {
  server: {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  },

  site: {
    baseSite: 'electronics',
    language: 'en',
    currency: 'USD'
  }
};
