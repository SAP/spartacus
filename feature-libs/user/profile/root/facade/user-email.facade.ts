import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { USER_PROFILE_FEATURE } from '../feature-name';

export function UserEmailFacadeFactory() {
  return facadeFactory({
    facade: UserEmailFacade,
    feature: USER_PROFILE_FEATURE,
    methods: ['update'],
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
  abstract update(password: string, newUid: string): Observable<unknown>;
}
