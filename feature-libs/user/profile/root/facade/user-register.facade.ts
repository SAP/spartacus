import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title, UserSignUp } from '../model/user-profile.model';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: UserRegisterFacade,
      feature: USER_PROFILE_CORE_FEATURE,
      methods: ['register', 'registerGuest', 'getTitles'],
    }),
})
export abstract class UserRegisterFacade {
  /**
   * Register a new user.
   *
   * @param submitFormData as UserRegisterFormData
   */
  abstract register(user: UserSignUp): Observable<User>;

  /**
   * Register a new user from guest.
   *
   * @param guid
   * @param password
   */
  abstract registerGuest(guid: string, password: string): Observable<User>;

  /**
   * Returns titles that can be used for the user profiles.
   */
  abstract getTitles(): Observable<Title[]>;
}
