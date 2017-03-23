import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    settings: {
        baseUrl,
        occPrefix,
        baseSite,
        oauth: {
            client_id,
            grant_type,
            client_secret
        }
    };

}
