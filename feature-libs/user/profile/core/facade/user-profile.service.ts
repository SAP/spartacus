import { Injectable } from '@angular/core';
import { AuthService, normalizeHttpError } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, throwError } from 'rxjs';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import { UpdateProfileCommand } from '../commands/update-profile.command';
import { TitleQuery } from '../queries/title.query';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class UserProfileService implements UserProfileFacade {
  constructor(
    protected userAccountService: UserAccountFacade,
    protected authService: AuthService,
    protected userProfileConnector: UserProfileConnector,
    protected updateProfileCommand: UpdateProfileCommand,
    protected titleQuery: TitleQuery
  ) {}

  get(): Observable<User> {
    return this.userAccountService.get();
  }

  /**
   * Updates the user's details.
   *
   * @param details User details to be updated.
   */
  update(details: User): Observable<User> {
    return this.updateProfileCommand.execute(details);
  }

  /**
   * Closes the user account.
   */
  close(): Observable<unknown> {
    return this.get().pipe(
      // tslint:disable-next-line:no-non-null-assertion
      switchMap((user) => this.userProfileConnector.remove(user.uid!)),
      tap(() => this.authService.logout()),
      catchError((error) => throwError(normalizeHttpError(error)))
    );
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.titleQuery.get();
  }
}
