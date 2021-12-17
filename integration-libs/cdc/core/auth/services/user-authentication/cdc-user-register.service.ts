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
import {
    Title,
    UserRegisterFacade,
    UserSignUp
} from '@spartacus/user/profile/root';
import {
    UserProfileConnector, UserProfileService
} from 'feature-libs/user/profile/core';
import { CdcJsService } from 'integration-libs/cdc/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CDCUserRegisterService implements UserRegisterFacade {
  protected registerCommand: Command<{ user: UserSignUp }, User> =
    this.command.create(
      ({ user }) =>
        new Observable<User>((userRegistered) => {
          if (user.firstName && user.lastName && user.uid && user.password) {
            this.cdcJSService.registerUserWithoutScreenSet(user);
          }
          this.store.dispatch(new UserActions.RegisterUserSuccess());
          userRegistered.complete();
        })
    );

  protected registerGuestCommand: Command<
    {
      guid: string;
      password: string;
    },
    User
  > = this.command.create((payload) =>
    this.userConnector.registerGuest(payload.guid, payload.password).pipe(
      tap((user) => {
        this.cdcJSService.didLoad().subscribe((cdcLoaded) => {
          if (!cdcLoaded) {
            console.log(
              'CDC Gigya SDK not loaded, registering using normal service'
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.authService.loginWithCredentials(user.uid!, payload.password);
          } else {
            console.log('Registering user through CDC Gigya SDK');
            if (user.uid) {
              this.cdcJSService.registerUserWithoutScreenSet({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: user.uid,
                password: payload.password,
              });
            }
          }
        });
      })
    )
  );

  constructor(
    protected userProfile: UserProfileService,
    protected userConnector: UserProfileConnector,
    protected authService: AuthService,
    protected command: CommandService,
    protected store: Store,
    protected winRef: WindowRef,
    protected cdcJSService: CdcJsService
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
