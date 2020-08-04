import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService, StateWithAuth, WindowRef } from '@spartacus/core';
import { CDCAuthActions } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class CDCAuthService extends AuthService {
  constructor(
    protected store: Store<StateWithAuth>,
    protected winRef: WindowRef
  ) {
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
  authorizeWithCustomCDCFlow(
    UID: string,
    UIDSignature: string,
    signatureTimestamp: string,
    idToken: string,
    baseSite: string
  ): void {
    this.store.dispatch(
      new CDCAuthActions.LoadCDCUserToken({
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
    super.logout();
    // trigger logout from CDC
    this.logoutFromCDC();
  }

  /**
   * Logout user from CDC
   */
  logoutFromCDC(): void {
    this.winRef.nativeWindow?.['gigya']?.accounts?.logout();
  }
}
