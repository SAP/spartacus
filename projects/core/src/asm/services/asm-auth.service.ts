import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateWithClientAuth } from '../../auth/client-auth/store/client-auth-state';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { CxOAuthService } from '../../auth/user-auth/facade/cx-oauth-service';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { AuthActions } from '../../auth/user-auth/store/actions/index';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AsmAuthService extends AuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected cxOAuthService: CxOAuthService,
    protected authStorageService: AsmAuthStorageService
  ) {
    super(store, userIdService, cxOAuthService, authStorageService);
  }

  public authorize(userId: string, password: string): void {
    let tokenTarget;
    let token;
    this.authStorageService
      .getToken()
      .subscribe((tok) => (token = tok))
      .unsubscribe();
    this.authStorageService
      .getTokenTarget()
      .subscribe((tokTarget) => (tokenTarget = tokTarget))
      .unsubscribe();
    if (Boolean(token?.access_token) && tokenTarget === TokenTarget.CSAgent) {
      // TODO: Show the warning that you cannot login when you are already logged in
    } else {
      super.authorize(userId, password);
    }
  }

  /**
   * Logout a storefront customer
   */
  public logout(): Promise<any> {
    let isEmulated;
    this.userIdService
      .isEmulated()
      .subscribe((emulated) => (isEmulated = emulated))
      .unsubscribe();
    if (isEmulated) {
      return new Promise((resolve) => {
        this.authStorageService.clearEmulatedUserToken();
        this.userIdService.clearUserId();
        this.store.dispatch(new AuthActions.Logout());
        // TODO: We should redirect to logout or home page?
        resolve();
      });
    } else {
      return super.logout();
    }
  }

  public isUserLoggedIn(): Observable<boolean> {
    return combineLatest([
      this.authStorageService.getToken(),
      this.userIdService.isEmulated(),
      this.authStorageService.getTokenTarget(),
    ]).pipe(
      map(
        ([token, isEmulated, tokenTarget]) =>
          (tokenTarget === TokenTarget.User && Boolean(token?.access_token)) ||
          (tokenTarget === TokenTarget.CSAgent &&
            Boolean(token?.access_token) &&
            isEmulated)
      )
    );
  }
}
