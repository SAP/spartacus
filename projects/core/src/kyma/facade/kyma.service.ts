import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OpenIdToken } from '../models/kyma-token-types.model';
import { KymaActions } from '../store/actions/index';
import { StateWithKyma } from '../store/kyma-state';
import { KymaSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class KymaService {
  constructor(protected store: Store<StateWithKyma>) {}

  /**
   * Authorizes using the Kyma OAuth client with scope `openid`.
   *
   * @param username a username
   * @param password a password
   */
  authorizeOpenId(username: string, password: string): void {
    this.store.dispatch(
      new KymaActions.LoadOpenIdToken({ username, password })
    );
  }

  /**
   * Returns the `OpenIdToken`, which was previously retrieved using `authorizeOpenId` method.
   */
  getOpenIdToken(): Observable<OpenIdToken> {
    return this.store.pipe(select(KymaSelectors.getOpenIdTokenValue));
  }
}
