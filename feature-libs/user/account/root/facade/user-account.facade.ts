import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { facadeFactory } from '@spartacus/storefront';
import {
  USER_ACCOUNT_CORE_FEATURE,
  USER_ACCOUNT_FEATURE,
} from '../feature-name';

export function userAccountFacadeFactory() {
  return facadeFactory({
    facade: UserAccountFacade,
    feature: [USER_ACCOUNT_CORE_FEATURE, USER_ACCOUNT_FEATURE],
    methods: ['get'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: userAccountFacadeFactory,
})
export abstract class UserAccountFacade {
  abstract get(): Observable<User>;
}
