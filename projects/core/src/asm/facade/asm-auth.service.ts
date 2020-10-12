import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { UserIdService } from '../../auth/facade/user-id.service';
import { UserToken } from '../../auth/models/token-types.model';
import { AuthActions } from '../../auth/store/actions';
import { AsmActions } from '../store/actions/index';
import { StateWithAsm } from '../store/asm-state';
import { AsmSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class AsmAuthService {
  constructor(
    protected store: Store<StateWithAsm>,
    protected authService: AuthService,
    protected userIdService: UserIdService
  ) {}

  /**
   * Loads a user token for a customer support agent
   * @param userId
   * @param password
   */
  authorizeCustomerSupportAgent(userId: string, password: string): void {
    this.store.dispatch(
      new AsmActions.LoadCustomerSupportAgentToken({
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
    this.authService.authorizeWithToken({
      ...customerSupportAgentToken,
    });
    this.userIdService.setUserId(customerId);
  }

  /**
   * Utility function to determine if customer is emulated.
   */
  isCustomerEmulated(): Observable<boolean> {
    return this.userIdService.isCustomerEmulated();
  }

  /**
   * Returns the customer support agent's token
   */
  getCustomerSupportAgentToken(): Observable<UserToken> {
    return this.store.pipe(select(AsmSelectors.getCustomerSupportAgentToken));
  }

  /**
   * Returns the customer support agent's token loading status
   */
  getCustomerSupportAgentTokenLoading(): Observable<boolean> {
    return this.store.pipe(
      select(AsmSelectors.getCustomerSupportAgentTokenLoading)
    );
  }

  /**
   * Logout a customer support agent
   */
  logoutCustomerSupportAgent(): void {
    this.getCustomerSupportAgentToken()
      .pipe(take(1))
      .subscribe((userToken) => {
        this.store.dispatch(new AsmActions.LogoutCustomerSupportAgent());
        this.store.dispatch(new AuthActions.RevokeUserToken(userToken));
      });
  }
}
