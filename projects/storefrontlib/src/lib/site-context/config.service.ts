import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  server = {
    baseUrl: 'https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics',
    language: 'en',
    currency: 'USD'
  };

  // site = {
  //     baseSite: 'apparel-uk',
  //     language: 'en',
  //     currency: 'GBP'
  // };
}
