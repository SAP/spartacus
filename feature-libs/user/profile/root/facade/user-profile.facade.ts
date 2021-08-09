import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title } from '../model/user-profile.model';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: UserProfileFacade,
      feature: USER_PROFILE_CORE_FEATURE,
      methods: ['get', 'update', 'close', 'getTitles'],
    }),
})
export abstract class UserProfileFacade {
  abstract get(): Observable<User | undefined>;

  /**
   * Updates the user's details.
   *
   * @param details User details to be updated.
   */
  abstract update(details: User): Observable<unknown>;

  /**
   * Closes the user account.
   */
  abstract close(): Observable<unknown>;

  /**
   * Returns titles that can be used for the user profiles.
   */
  abstract getTitles(): Observable<Title[]>;
}
