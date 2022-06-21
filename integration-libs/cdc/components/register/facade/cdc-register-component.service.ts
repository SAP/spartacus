import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthService,
  Command,
  CommandService,
  UserActions,
  WindowRef
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import {
  Title, UserSignUp
} from '@spartacus/user/profile/root';
import {
  UserProfileConnector, UserProfileService
} from 'feature-libs/user/profile/core';
import { CdcJsService } from 'integration-libs/cdc/root';
import { Observable } from 'rxjs';

@Injectable()
export class CDCRegisterComponentService extends RegisterComponentService {
  protected registerCommand: Command<{ user: UserSignUp }, User> =
    this.command.create(
      ({ user }) =>
        new Observable<User>((userRegistered) => {
          // Registering user through CDC Gigya SDK
          if (user.firstName && user.lastName && user.uid && user.password) {
            this.cdcJSService.registerUserWithoutScreenSet(user);
          }
          this.store.dispatch(new UserActions.RegisterUserSuccess());
          userRegistered.complete();
        })
    );



  constructor(
    protected userProfile: UserProfileService,
    protected userConnector: UserProfileConnector,
    protected authService: AuthService,
    protected command: CommandService,
    protected store: Store,
    protected winRef: WindowRef,
    protected cdcJSService: CdcJsService
  ) {
    super(userProfile, userConnector, authService, command, store);
  }

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
