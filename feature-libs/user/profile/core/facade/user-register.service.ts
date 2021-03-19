import { Injectable } from '@angular/core';
import { AuthService, CommandService } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import {
  Title,
  UserProfileFacade,
  UserRegisterFacade,
  UserSignUp,
} from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserRegisterService implements UserRegisterFacade {
  protected registerCommand = this.command.create<{ user: UserSignUp }, User>(
    ({ user }) => this.userConnector.register(user)
  );

  protected registerGuestCommand = this.command.create<{
    guid: string;
    password: string;
  }, User>((payload) =>
    this.userConnector.registerGuest(payload.guid, payload.password).pipe(
      tap((user) => {
        // tslint:disable-next-line:no-non-null-assertion
        this.authService.loginWithCredentials(user.uid!, payload.password);
      })
    )
  );

  constructor(
    protected userProfile: UserProfileFacade,
    private userConnector: UserProfileConnector,
    private authService: AuthService,
    protected command: CommandService
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
   * Register a new user from guest.
   *
   * @param guid
   * @param password
   */
  registerGuest(guid: string, password: string): Observable<User> {
    return this.registerGuestCommand.execute({ guid, password });
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.userProfile.getTitles();
  }
}
