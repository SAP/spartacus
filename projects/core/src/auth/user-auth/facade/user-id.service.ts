import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../../occ/utils/occ-constants';

/**
 * This implementation is OCC specific.
 * Different backend might have completely different need regarding user id.
 * It might not need user id at all and work based on access_token.
 * To implement custom solution provide your own implementation and customize services that use UserIdService
 */
@Injectable({
  providedIn: 'root',
})
export class UserIdService {
  private _userId: Observable<string> = new ReplaySubject<string>(1);

  /**
   * Sets current user id.
   *
   * @param userId
   */
  public setUserId(userId: string): void {
    (this._userId as ReplaySubject<string>).next(userId);
  }

  /**
   * This function provides the userId the OCC calls should use, depending
   * on whether there is an active storefront session or not.
   *
   * It returns the userId of the current storefront user or 'anonymous'
   * in the case there are no signed in user in the storefront.
   *
   * The user id of a regular customer session is 'current'. In the case of an
   * asm customer emulation session, the userId will be the customerId.
   */
  public getUserId(): Observable<string> {
    return this._userId;
  }

  /**
   * Utility method if you need userId to perform single action (eg. dispatch call to API).
   *
   * @param loggedIn Set to true if you want the observable to emit id only for logged in user. Throws in case of anonymous user.
   *
   * @returns Observable that emits once and completes with the last userId value.
   */
  public takeUserId(loggedIn = false): Observable<string> {
    return this.getUserId().pipe(
      take(1),
      map((userId) => {
        if (loggedIn && userId === OCC_USER_ID_ANONYMOUS) {
          throw new Error(
            'Requested user id for logged user while user is not logged in.'
          );
        }
        return userId;
      })
    );
  }

  /**
   * Sets user id to the default value for logged out user.
   */
  public clearUserId(): void {
    this.setUserId(OCC_USER_ID_ANONYMOUS);
  }

  /**
   * Checks if the userId is of emulated user type.
   */
  public isEmulated(): Observable<boolean> {
    return this.getUserId().pipe(
      map(
        (userId) =>
          userId !== OCC_USER_ID_ANONYMOUS && userId !== OCC_USER_ID_CURRENT
      )
    );
  }
}
