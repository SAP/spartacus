import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { UserToken } from '../../auth/models/token-types.model';
import { AuthService } from '../../auth/facade/auth.service';
import { AsmSelectors } from '../store/selectors/index';
import { StateWithAsm } from '../store/asm-state';
import { AsmActions } from '../store/actions/index';

@Injectable({
  providedIn: 'root',
})
export class AsmAuthService {
  constructor(
    protected store: Store<StateWithAsm>,
    protected authService: AuthService
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
      userId: customerId,
    });
  }

  /**
   * Utility function to determine if a given token is a customer emulation session token.
   * @param userToken
   */
  isCustomerEmulationToken(userToken: UserToken): boolean {
    return (
      Boolean(userToken) &&
      Boolean(userToken.userId) &&
      userToken.userId !== OCC_USER_ID_CURRENT
    );
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
    this.store.dispatch(new AsmActions.LogoutCustomerSupportAgent());
  }
}
