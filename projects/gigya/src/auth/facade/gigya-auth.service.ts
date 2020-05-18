import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthService,
  StateWithAuth,
  AuthActions,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { GigyaAuthActions } from '../store/actions';
import { take } from 'rxjs/operators';

declare var gigya: any;

@Injectable({
  providedIn: 'root',
})
export class GigyaAuthService extends AuthService {
  constructor(protected store: Store<StateWithAuth>) {
    super(store);
  }

  /**
   * Loads a new user token using custom oauth flow
   *
   * @param UID
   * @param UIDSignature
   * @param signatureTimestamp
   * @param idToken
   * @param baseSite
   */
  authorizeWithCustomGigyaFlow(
    UID: string,
    UIDSignature: string,
    signatureTimestamp: string,
    idToken: string,
    baseSite: string
  ): void {
    this.store.dispatch(
      new GigyaAuthActions.LoadGigyaUserToken({
        UID: UID,
        UIDSignature: UIDSignature,
        signatureTimestamp: signatureTimestamp,
        idToken: idToken,
        baseSite: baseSite,
      })
    );
  }

  /**
   * Logout a storefront customer
   */
  logout(): void {
    this.getUserToken()
      .pipe(take(1))
      .subscribe(userToken => {
        this.store.dispatch(new AuthActions.Logout());
        if (Boolean(userToken) && userToken.userId === OCC_USER_ID_CURRENT) {
          this.store.dispatch(new AuthActions.RevokeUserToken(userToken));
        }
      });

    // trigger logout from cdc
    gigya.accounts.logout();
  }
}
