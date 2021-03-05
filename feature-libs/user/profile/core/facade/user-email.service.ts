import { Injectable } from '@angular/core';
import { normalizeHttpError } from '@spartacus/core';
import { ConnectableObservable, Observable, throwError } from 'rxjs';
import { catchError, publishReplay, switchMap, take } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';

@Injectable()
export class UserEmailService implements UserEmailFacade {
  constructor(
    protected userProfileService: UserProfileService,
    private userProfileConnector: UserProfileConnector
  ) {}

  /**
   * Updates the user's email.
   *
   * @param password to users password to confirm the users
   * @param newUid the new proposed email address.
   */
  update(password: string, newUid: string): Observable<unknown> {
    const update$ = this.userProfileService.get().pipe(
      take(1),
      switchMap((user) =>
        this.userProfileConnector
          // tslint:disable-next-line:no-non-null-assertion
          .updateEmail(user.uid!, password, newUid)
          .pipe(catchError((error) => throwError(normalizeHttpError(error))))
      ),
      publishReplay()
    ) as ConnectableObservable<unknown>;
    update$.connect();
    return update$;
  }
}
