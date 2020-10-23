import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthToken } from '../../auth';
import { StateWithClientAuth } from '../../auth/client-auth/store/client-auth-state';
import { CxOAuthService } from '../../auth/user-auth/facade/cx-oauth-service';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { AuthRedirectService } from '../../auth/user-auth/guards/auth-redirect.service';
import { BasicAuthService } from '../../auth/user-auth/services/basic-auth.service';
import { AuthActions } from '../../auth/user-auth/store/actions/index';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../global-message/index';
import { RoutingService } from '../../routing/facade/routing.service';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AsmAuthService extends BasicAuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected cxOAuthService: CxOAuthService,
    protected authStorageService: AsmAuthStorageService,
    protected authRedirectService: AuthRedirectService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService
  ) {
    super(
      store,
      userIdService,
      cxOAuthService,
      authStorageService,
      authRedirectService,
      routingService
    );
  }

  protected canUserLogin(): boolean {
    let tokenTarget: TokenTarget;
    let token: AuthToken;

    this.authStorageService
      .getToken()
      .subscribe((tok) => (token = tok))
      .unsubscribe();
    this.authStorageService
      .getTokenTarget()
      .subscribe((tokTarget) => (tokenTarget = tokTarget))
      .unsubscribe();
    return !(
      Boolean(token?.access_token) && tokenTarget === TokenTarget.CSAgent
    );
  }

  protected warnAboutLoggedCSAgent(): void {
    this.globalMessageService.add(
      {
        key: 'asm.auth.agentLoggedInError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  public authorize(userId: string, password: string): void {
    if (this.canUserLogin()) {
      super.authorize(userId, password);
    } else {
      this.warnAboutLoggedCSAgent();
    }
  }

  public loginWithRedirect(): boolean {
    if (this.canUserLogin()) {
      super.loginWithRedirect();
      return true;
    } else {
      this.warnAboutLoggedCSAgent();
      return false;
    }
  }

  /**
   * Logout a storefront customer
   */
  public logout(): Promise<any> {
    return this.userIdService
      .isEmulated()
      .pipe(
        take(1),
        switchMap((isEmulated) => {
          if (isEmulated) {
            this.authStorageService.clearEmulatedUserToken();
            this.userIdService.clearUserId();
            this.store.dispatch(new AuthActions.Logout());
            return of(true);
          } else {
            return from(super.logout());
          }
        })
      )
      .toPromise();
  }

  public isUserLoggedIn(): Observable<boolean> {
    return combineLatest([
      this.authStorageService.getToken(),
      this.userIdService.isEmulated(),
      this.authStorageService.getTokenTarget(),
    ]).pipe(
      map(
        ([token, isEmulated, tokenTarget]) =>
          Boolean(token?.access_token) &&
          (tokenTarget === TokenTarget.User ||
            (tokenTarget === TokenTarget.CSAgent && isEmulated))
      )
    );
  }
}
