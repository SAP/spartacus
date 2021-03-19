import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { facadeFactory } from '@spartacus/core';
import { USER_ACCOUNT_CORE_FEATURE } from '../feature-name';

export function userAccountFacadeFactory() {
  return facadeFactory({
    facade: UserAccountFacade,
    feature: USER_ACCOUNT_CORE_FEATURE,
    methods: ['get'],
    async: true,
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: userAccountFacadeFactory,
})
export abstract class UserAccountFacade {
  abstract get(): Observable<User>;
}
