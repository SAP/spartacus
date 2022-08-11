import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { facadeFactory } from '@spartacus/core';
import { USER_ACCOUNT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: UserAccountFacade,
      feature: USER_ACCOUNT_CORE_FEATURE,
      methods: ['get'],
    }),
})
export abstract class UserAccountFacade {
  abstract get(): Observable<User | undefined>;
}
