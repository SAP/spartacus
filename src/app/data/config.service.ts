import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    site: {
        language: null
    };

    authentication = {
        userToken: null
    };
}
