import { Injectable } from '@angular/core';
import { DefaultConfigService } from '../../default-config.service';

@Injectable()
export class ConfigService extends DefaultConfigService {
  server = {
    baseUrl: 'https://localhost:9002',
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
