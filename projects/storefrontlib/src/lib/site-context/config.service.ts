import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics',
    language: 'en',
    currency: 'USD'
  };
}
