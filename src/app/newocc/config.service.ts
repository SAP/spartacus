import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    x = {

    };

    server = {
        baseUrl: null,
        occPrefix: null
    };

    site: {
        baseSite: null,
        language: null,
        currency: null
    };

    authentication: {
        client_id: null,
        client_secret: null
        userToken: {}
    };

}
