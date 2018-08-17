import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  server = {
    baseUrl: null,
    occPrefix: null
  };

  authentication: {
    client_id: null;
    client_secret: null;
    userToken: {};
  };
}
