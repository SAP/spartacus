import { Injectable } from '@angular/core';
import { AuthService, normalizeHttpError } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { ConnectableObservable, Observable, throwError } from 'rxjs';
import {
  Title,
  UserProfileFacade,
  UserRegisterFacade,
  UserSignUp,
} from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors';
import { catchError, publishReplay, tap } from 'rxjs/operators';

@Injectable()
export class UserRegisterService implements UserRegisterFacade {
  constructor(
    protected userProfile: UserProfileFacade,
    private userConnector: UserProfileConnector,
    private authService: AuthService
  ) {}

  /**
   * Register a new user.
   *
   * @param submitFormData as UserRegisterFormData
   */
  register(user: UserSignUp): Observable<User> {
    const register$ = this.userConnector.register(user).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      publishReplay()
    ) as ConnectableObservable<User>;
    register$.connect();
    return register$;
  }

  /**
   * Register a new user from guest.
   *
   * @param guid
   * @param password
   */
  registerGuest(guid: string, password: string): Observable<User> {
    const register$ = this.userConnector.registerGuest(guid, password).pipe(
      tap((user) => {
        // tslint:disable-next-line:no-non-null-assertion
        this.authService.loginWithCredentials(user.uid!, password);
      }),
      catchError((error) => throwError(normalizeHttpError(error))),
      publishReplay()
    ) as ConnectableObservable<User>;
    register$.connect();
    return register$;
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.userProfile.getTitles();
  }
}
