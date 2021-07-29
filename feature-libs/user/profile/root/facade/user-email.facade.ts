import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: UserEmailFacade,
      feature: USER_PROFILE_CORE_FEATURE,
      methods: ['update'],
    }),
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
