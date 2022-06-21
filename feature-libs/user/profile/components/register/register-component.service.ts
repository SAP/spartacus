import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthService,
  Command,
  CommandService, Title,
  User,
  UserActions
} from '@spartacus/core';
import { UserProfileConnector, UserProfileService } from '@spartacus/user/profile/core';
import { UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RegisterComponentService {
  protected registerCommand: Command<{ user: UserSignUp }, User> =
    this.command.create(({ user }) =>
      this.userConnector.register(user).pipe(
        tap(() => {
          // this is a compatibility mechanism only, to make anonymous consents
          // management work properly in transitional period (when we move logic
          // to separate libraries)
          this.store.dispatch(new UserActions.RegisterUserSuccess());
        })
      )
    );

  constructor(
    protected userProfile: UserProfileService,
    protected userConnector: UserProfileConnector,
    protected authService: AuthService,
    protected command: CommandService,
    protected store: Store
  ) {}

  /**
   * Register a new user.
   *
   * @param submitFormData as UserRegisterFormData
   */
  register(user: UserSignUp): Observable<User> {
    return this.registerCommand.execute({ user });
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.userProfile.getTitles();
  }
}
