import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { ClientToken, UserToken } from '../models/token-types.model';
import { AuthActions } from '../store/actions/index';
import { StateWithAuth } from '../store/auth-state';
import { AuthSelectors } from '../store/selectors/index';
import { UserIdService } from './user-id.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    protected store: Store<StateWithAuth>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Loads a new user token
   * @param userId
   * @param password
   */
  authorize(userId: string, password: string): void {
    this.store.dispatch(
      new AuthActions.LoadUserToken({
        userId: userId,
        password: password,
      })
    );
  }

  /**
   * This function provides the userId the OCC calls should use, depending
   * on whether there is an active storefront session or not.
   *
   * It returns the userId of the current storefront user or 'anonymous'
   * in the case there are no signed in user in the storefront.
   *
   * The user id of a regular customer session is 'current'.  In the case of an
   * asm customer emulation session, the userId will be the customerId.
   */
  getOccUserId(): Observable<string> {
    return this.userIdService.getUserId();
  }

  /**
   * Calls provided callback with current user id.
   *
   * @param cb callback function to invoke
   */
  invokeWithUserId(cb: (userId: string) => any): Subscription {
    return this.getOccUserId()
      .pipe(take(1))
      .subscribe((id) => cb(id));
  }

  /**
   * Returns the user's token
   */
  getUserToken(): Observable<UserToken> {
    return this.store.pipe(select(AuthSelectors.getUserToken));
  }

  /**
   * Refreshes the user token
   * @param token a user token to refresh
   */
  refreshUserToken(token: UserToken): void {
    this.store.dispatch(
      new AuthActions.RefreshUserToken({
        refreshToken: token.refresh_token,
      })
    );
  }

  /**
   * Store the provided token
   */
  authorizeWithToken(token: UserToken): void {
    this.store.dispatch(new AuthActions.LoadUserTokenSuccess(token));
  }

  /**
   * Logout a storefront customer
   */
  logout(): void {
    this.getUserToken()
      .pipe(take(1))
      .subscribe((userToken) => {
        this.userIdService.clearUserId();
        this.store.dispatch(new AuthActions.ClearUserToken());
        this.store.dispatch(new AuthActions.Logout());
        if (Boolean(userToken)) {
          this.store.dispatch(new AuthActions.RevokeUserToken(userToken));
        }
      });
  }

  /**
   * Returns a client token.  The client token from the store is returned if there is one.
   * Otherwise, an new token is fetched from the backend and saved in the store.
   */
  getClientToken(): Observable<ClientToken> {
    return this.store.pipe(
      select(AuthSelectors.getClientTokenState),
      filter((state: LoaderState<ClientToken>) => {
        if (this.isClientTokenLoaded(state)) {
          return true;
        } else {
          if (!state.loading) {
            this.store.dispatch(new AuthActions.LoadClientToken());
          }
          return false;
        }
      }),
      map((state: LoaderState<ClientToken>) => state.value)
    );
  }

  /**
   * Fetches a clientToken from the backend ans saves it in the store where getClientToken can use it.
   * The new clientToken is returned.
   */
  refreshClientToken(): Observable<ClientToken> {
    this.store.dispatch(new AuthActions.LoadClientToken());

    return this.store.pipe(
      select(AuthSelectors.getClientTokenState),
      filter((state: LoaderState<ClientToken>) =>
        this.isClientTokenLoaded(state)
      ),
      map((state: LoaderState<ClientToken>) => state.value)
    );
  }

  protected isClientTokenLoaded(state: LoaderState<ClientToken>): boolean {
    return (state.success || state.error) && !state.loading;
  }

  /**
   * Returns `true` if the user is logged in; and `false` if the user is anonymous.
   */
  isUserLoggedIn(): Observable<boolean> {
    return this.getUserToken().pipe(
      map((userToken) => Boolean(userToken) && Boolean(userToken.access_token))
    );
  }
}
