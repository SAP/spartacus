import { Injectable } from '@angular/core';
import { Title, User } from '@spartacus/core';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterComponentService {
  constructor(protected userRegisterFacade: UserRegisterFacade) {}

  /**
   * Register a new user.
   *
   * @param user as UserSignUp
   */
  register(user: UserSignUp): Observable<User> {
    return this.userRegisterFacade.register(user);
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.userRegisterFacade.getTitles();
  }
}
