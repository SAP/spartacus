/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Optional, inject } from '@angular/core';
import {
  ASM_ENABLED_LOCAL_STORAGE_KEY,
  CsAgentAuthService,
  AsmDeepLinkParameters,
  AsmDeepLinkService,
  AsmEnablerService,
} from '@spartacus/asm/root';
import { AuthService, RoutingService, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AsmDialogActionEvent,
  AsmDialogActionType,
} from '@spartacus/asm/customer-360/root';

@Injectable({
  providedIn: 'root',
})
export class AsmComponentService {
  protected searchparam: URLSearchParams;
  isEmulatedByDeepLink$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected showDeeplinkCartInfoAlert$: BehaviorSubject<boolean> =
    new BehaviorSubject(false);

  protected routingService = inject(RoutingService);

  constructor(
    authService: AuthService,
    csAgentAuthService: CsAgentAuthService,
    winRef: WindowRef,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    asmEnablerService: AsmEnablerService,
    asmDeepLinkService: AsmDeepLinkService
  );
  /**
   * @deprecated since 7.0 (CXSPA-3090)
   */
  constructor(
    authService: AuthService,
    csAgentAuthService: CsAgentAuthService,
    winRef: WindowRef
  );
  constructor(
    protected authService: AuthService,
    protected csAgentAuthService: CsAgentAuthService,
    protected winRef: WindowRef,
    // TODO(CXSPA-3090): Remove optional flag in 7.0 where service is used
    @Optional() protected asmEnablerService?: AsmEnablerService,
    @Optional() protected asmDeepLinkService?: AsmDeepLinkService
  ) {
    // TODO(CXSPA-3090): We can remove this in 7.0 and use asmDeepLinkService instead.
    this.searchparam = new URLSearchParams(this.winRef?.location?.search);
  }

  /**
   * Returns a deep link parameter value if it is in the url.
   */
  getSearchParameter(key: string): string | undefined | null {
    // TODO(CXSPA-3090): Use asmDeepLinkService only in 7.0
    return (
      this.asmDeepLinkService?.getSearchParameter(key) ??
      this.searchparam.get(key)
    );
  }

  isEmulatedByDeepLink(): BehaviorSubject<boolean> {
    return this.isEmulatedByDeepLink$;
  }

  setEmulatedByDeepLink(emulated: boolean) {
    this.isEmulatedByDeepLink$.next(emulated);
  }

  setShowDeeplinkCartInfoAlert(display: boolean) {
    this.showDeeplinkCartInfoAlert$.next(display);
  }

  shouldShowDeeplinkCartInfoAlert(): Observable<boolean> {
    return this.showDeeplinkCartInfoAlert$;
  }

  logoutCustomerSupportAgentAndCustomer(): void {
    this.csAgentAuthService.logoutCustomerSupportAgent();
  }

  logoutCustomer(): void {
    this.authService.logout();
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

  /**
   * check whether try to emulate customer from deeplink
   */
  isEmulateInURL(): boolean {
    // TODO(CXSPA-3090): Use asmDeepLinkService only in 7.0
    return (
      (this.asmDeepLinkService?.isEmulateInURL() ??
        this.asmEnablerService?.isEmulateInURL()) ||
      false
    );
  }

  /**
   * Returns valid deep link parameters in the url.
   */
  getDeepLinkUrlParams(): AsmDeepLinkParameters | undefined {
    return this.asmDeepLinkService?.getParamsInUrl();
  }

  /**
   * Handles the navigation based on deep link parameters in the URL
   * or passed parameter.
   */
  handleDeepLinkNavigation(parameters = this.getDeepLinkUrlParams()): void {
    this.asmDeepLinkService?.handleNavigation(parameters);
  }

  handleAsmDialogAction(event: AsmDialogActionEvent | string): void {
    if (
      typeof event === 'object' &&
      event.actionType === AsmDialogActionType.NAVIGATE
    ) {
      this.routingService.go(event.route);
    }
  }
}
