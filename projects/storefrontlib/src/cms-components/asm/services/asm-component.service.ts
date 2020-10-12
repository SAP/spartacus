import { Injectable } from '@angular/core';
import {
  AsmAuthService,
  CsAgentAuthService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_ENABLED_LOCAL_STORAGE_KEY } from '../asm-constants';

@Injectable({
  providedIn: 'root',
})
export class AsmComponentService {
  constructor(
    protected authService: AsmAuthService,
    protected csAgentAuthService: CsAgentAuthService,
    protected routingService: RoutingService,
    protected winRef: WindowRef
  ) {}

  logoutCustomerSupportAgentAndCustomer(): void {
    this.csAgentAuthService.logoutCustomerSupportAgent();
  }

  logoutCustomer(): void {
    this.authService.logout(true);
    this.routingService.go({ cxRoute: 'home' });
  }

  isCustomerEmulationSessionInProgress(): Observable<boolean> {
    return this.csAgentAuthService.isCustomerEmulated();
  }

  /**
   * We're currently only removing the persisted storage in the browser
   * to ensure the ASM experience isn't loaded on the next visit. There are a few
   * optimizations we could think of:
   * - drop the `asm` parameter from the URL, in case it's still there
   * - remove the generated UI from the DOM (outlets currently do not support this)
   */
  unload() {
    if (this.winRef.localStorage) {
      this.winRef.localStorage.removeItem(ASM_ENABLED_LOCAL_STORAGE_KEY);
    }
  }
}
