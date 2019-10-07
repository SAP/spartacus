import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../occ/utils/occ-constants';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { ClientToken, UserToken } from '../models/token-types.model';
import { AuthActions } from '../store/actions/index';
import { StateWithAuth } from '../store/auth-state';
import { AuthSelectors } from '../store/selectors/index';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(protected store: Store<StateWithAuth>) {}

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
   * Loads a user token for a customer support agent
   * @param userId
   * @param password
   */
  authorizeCustomerSupporAgent(userId: string, password: string): void {
    this.store.dispatch(
      new AuthActions.LoadCustomerSupportAgentToken({
        userId: userId,
        password: password,
      })
    );
  }

  /**
   * Starts an ASM customer emulation session.
   * A customer emulation session is stoped by calling logout().
   * @param customerSupportAgentToken
   * @param customerId
   */
  public startCustomerEmulationSession(
    customerSupportAgentToken: UserToken,
    customerId: string
  ): void {
    this.authorizeWithToken({
      ...customerSupportAgentToken,
      userId: customerId,
    });
  }

  /**
   * This function provides the userId the OCC calls should use, depending
   * on wether there is an active storefront session or not.
   *
   * It returns the userId of the current storefront user or 'anonymous'
   * in the case there are no signed in user in the storefront.
   *
   * The user id of a regular customer session is 'current'.  In the case of an
   * asm customer emulation session, the userId will be the customerId.
   */
  getOccUserId(): Observable<string> {
    return this.getUserToken().pipe(
      map(userToken => {
        if (!!userToken && !!userToken.userId) {
          return userToken.userId;
        } else {
          return OCC_USER_ID_ANONYMOUS;
        }
      })
    );
  }

  /**
   * Utility function to determine if a given token is a customer emulation session token.
   * @param userToken
   */
  isCustomerEmulationToken(userToken: UserToken): boolean {
    return !!userToken.userId && userToken.userId !== OCC_USER_ID_CURRENT;
  }

  /**
   * Returns the user's token
   */
  getUserToken(): Observable<UserToken> {
    return this.store.pipe(select(AuthSelectors.getUserToken));
  }

  /**
   * Returns the customer support agent's token
   */
  getCustomerSupportAgentToken(): Observable<UserToken> {
    return this.store.pipe(select(AuthSelectors.getCustomerSupportAgentToken));
  }

  /**
   * Returns the customer support agent's token loading status
   */
  getCustomerSupportAgentTokenLoading(): Observable<boolean> {
    return this.store.pipe(
      select(AuthSelectors.getCustomerSupportAgentTokenLoading)
    );
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
    this.store.dispatch(new AuthActions.Logout());
  }

  /**
   * Logout a customer support agent
   */
  logoutCustomerSupportAgent(): void {
    this.store.dispatch(new AuthActions.LogoutCustomerSupportAgent());
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
}
