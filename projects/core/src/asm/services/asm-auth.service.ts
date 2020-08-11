import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StateWithClientAuth } from '../../auth/client-auth/store/client-auth-state';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { CxOAuthService } from '../../auth/user-auth/facade/cx-oauth-service';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { AuthActions } from '../../auth/user-auth/store/actions';
import { AsmAuthStorageService } from './asm-auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AsmAuthService extends AuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected oAuthService: CxOAuthService,
    protected authStorageService: AsmAuthStorageService
  ) {
    super(store, userIdService, oAuthService, authStorageService);
  }

  /**
   * Logout a storefront customer
   */
  logout(skipRevocation = false): Promise<any> {
    let isEmulated;
    this.authStorageService
      .isEmulated()
      .pipe(take(1))
      .subscribe((isCustomerEmulated) => (isEmulated = isCustomerEmulated));

    this.userIdService.clearUserId();
    if (isEmulated || skipRevocation) {
      return new Promise((resolve) => {
        this.authStorageService.switchToUser();
        this.oAuthService.logout();
        this.store.dispatch(new AuthActions.Logout());
        resolve();
      });
    } else {
      return new Promise((resolve) => {
        this.oAuthService.revokeAndLogout().finally(() => {
          this.store.dispatch(new AuthActions.Logout());
          resolve();
        });
      });
    }
  }
}
