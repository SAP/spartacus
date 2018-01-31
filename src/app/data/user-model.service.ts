import { Injectable } from '@angular/core';
import { ModelService } from './model.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const USER_KEY = 'userrrr';
const ACCESS_TOKEN_KEY = 'userAccessToken';

@Injectable()
export class UserModelService extends ModelService {

    getUser() {
        return super.get(USER_KEY);
    }

    storeUser(model) {
        super.store(USER_KEY, model);
    }

    getToken() {
        return super.get(ACCESS_TOKEN_KEY);
    }

    storeToken(model) {
        super.store(ACCESS_TOKEN_KEY, model);
    }
}
