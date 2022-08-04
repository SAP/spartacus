import { Injectable } from '@angular/core';
import {
  AsmDialogActionEvent,
  ASM_ENABLED_LOCAL_STORAGE_KEY,
  CsAgentAuthService,
} from '@spartacus/asm/root';
import { AuthService, GlobalMessageService, GlobalMessageType, RoutingService, WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsmComponentService {
  constructor(
    protected authService: AuthService,
    protected csAgentAuthService: CsAgentAuthService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected winRef: WindowRef
  ) {}

  logoutCustomerSupportAgentAndCustomer(): void {
    this.csAgentAuthService.logoutCustomerSupportAgent();
  }

  logoutCustomer(): void {
    this.authService.logout();
  }


  startCustomerEmulationSession(customerId: string ): boolean {
    if (customerId) {
      this.csAgentAuthService.startCustomerEmulationSession(customerId);
      return true;
    } else {
      this.globalMessageService.add(
        { key: 'asm.error.noCustomerId' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      return false;
    }
  }

  isCustomerEmulationSessionInProgress(): Observable<boolean> {
    return this.csAgentAuthService.isCustomerEmulated();
  }

// TODO: Find better place for method
  handleAsmDialogAction(event: AsmDialogActionEvent): void {
    let selectedUser = event.selectedUser?.customerId;
    let route = event.route;
    if (event.actionType === 'START_SESSION' && selectedUser) {
      this.startCustomerEmulationSession(selectedUser);
      if (route) {
        this.routingService.go({ cxRoute: route });
      }
    } else {
      this.routingService.go({ cxRoute: route });
    }
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
