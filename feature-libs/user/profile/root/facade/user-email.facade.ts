import { Injectable } from '@angular/core';
import { facadeFactory, StateUtils } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { USER_PROFILE_FEATURE } from '../feature-name';

export function UserEmailFacadeFactory() {
  return facadeFactory({
    facade: UserEmailFacade,
    feature: USER_PROFILE_FEATURE,
    methods: ['update'],
    async: true,
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: UserEmailFacadeFactory,
})
export abstract class UserEmailFacade {
  /**
   * Updates the user's email.
   *
   * @param password to users password to confirm the users
   * @param newUid the new proposed email address.
   */
  abstract update(
    password: string,
    newUid: string
  ): Observable<StateUtils.LoaderState<User>>;
}
