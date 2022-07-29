import { Injectable } from '@angular/core';
import { Title, User } from '@spartacus/core';
import { UserRegisterService } from '@spartacus/user/profile/core';
import { UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterComponentService {
  constructor(protected userRegisterService: UserRegisterService) {}

  /**
   * Register a new user.
   *
   * @param submitFormData as UserRegisterFormData
   */
  register(user: UserSignUp): Observable<User> {
    return this.userRegisterService.register(user);
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.userRegisterService.getTitles();
  }
}
