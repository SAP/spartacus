import { Injectable } from '@angular/core';

@Injectable()
export class AuthModuleConfig {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics'
  };

  authentication = {
    client_id: 'mobile_android',
    client_secret: 'secret'
  };
}
