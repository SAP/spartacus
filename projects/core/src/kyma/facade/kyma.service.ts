import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OpenIdToken } from '../models/kyma-token-types.model';
import { LoadOpenIdToken } from '../store/actions/open-id-token.action';
import { StateWithKyma } from '../store/kyma-state';
import { getOpenIdTokenValue } from '../store/selectors/open-id-token.selectors';

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
    this.store.dispatch(new LoadOpenIdToken({ username, password }));
  }

  /**
   * Returns the `OpenIdToken`, which was previously retrieved using `authorizeOpenId` method.
   */
  getOpenIdToken(): Observable<OpenIdToken> {
    return this.store.pipe(select(getOpenIdTokenValue));
  }
}
