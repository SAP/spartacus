import { Injectable } from '@angular/core';

interface ServerConfig { baseUrl?: string; occPrefix?: string; }
interface SiteConfig { baseSite?: string; language?: string; currency?: string; }

@Injectable()
export class OccModuleConfig {
  server?: ServerConfig = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  site?: SiteConfig = {
    baseSite: 'electronics',
    language: 'en',
    currency: 'USD'
  };
}
