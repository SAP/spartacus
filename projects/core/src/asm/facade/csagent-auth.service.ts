import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CxOAuthService } from '../../auth/user-auth/facade/cx-oauth-service';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { UserToken } from '../../auth/user-auth/models/user-token.model';
import { AsmAuthStorageService } from '../services/asm-auth-storage.service';
import { AsmAuthService } from '../services/asm-auth.service';
import { AsmActions, StateWithAsm } from '../store';

@Injectable({
  providedIn: 'root',
})
export class CsAgentAuthService {
  constructor(
    protected authService: AsmAuthService,
    protected authStorageService: AsmAuthStorageService,
    protected userIdService: UserIdService,
    protected oAuthService: CxOAuthService,
    protected store: Store<StateWithAsm>
  ) {}

  /**
   * Loads a user token for a customer support agent
   * @param userId
   * @param password
   */
  authorizeCustomerSupportAgent(userId: string, password: string): void {
    this.authStorageService.switchToCSAgent();
    this.oAuthService.authorizeWithPasswordFlow(userId, password).then(() => {
      this.authStorageService.switchToUser();
    });
  }

  /**
   * Starts an ASM customer emulation session.
   * A customer emulation session is stopped by calling logout().
   * @param customerId
   */
  public startCustomerEmulationSession(customerId: string): void {
    this.authStorageService.copyCSAgentTokenForUser();
    this.authStorageService.switchToEmulated();

    // OCC specific user id handling. Customize when implementing different backend
    this.userIdService.setUserId(customerId);
  }

  /**
   * Utility function to determine if customer is emulated.
   */
  isCustomerEmulated(): Observable<boolean> {
    return this.authStorageService.isEmulated();
  }

  /**
   * Returns the customer support agent's token
   */
  getCustomerSupportAgentToken(): Observable<UserToken> {
    return this.authStorageService.getCSAgentToken();
  }

  /**
   * Returns the customer support agent's token loading status
   */
  getCustomerSupportAgentTokenLoading(): Observable<boolean> {
    // TODO(#8248): Create new loading state outside of store
    return of(false);
  }

  /**
   * Logout a customer support agent
   */
  logoutCustomerSupportAgent(): void {
    let isEmulated;
    this.isCustomerEmulated()
      .pipe(take(1))
      .subscribe((isCustomerEmulated) => (isEmulated = isCustomerEmulated));
    if (isEmulated) {
      // TODO: Improve it to avoid UI flickering (go directly into logged out state without the user selection view)
      this.authService.logout(true).then(() => {
        this.authStorageService.switchToCSAgent();
        this.oAuthService.revokeAndLogout().then(() => {
          this.store.dispatch(new AsmActions.LogoutCustomerSupportAgent());
          this.authStorageService.switchToUser();
        });
      });
    } else {
      this.authStorageService.switchToCSAgent();
      this.oAuthService.revokeAndLogout().then(() => {
        this.store.dispatch(new AsmActions.LogoutCustomerSupportAgent());
        this.authStorageService.switchToUser();
      });
    }
  }
}
