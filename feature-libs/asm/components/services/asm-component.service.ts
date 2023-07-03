/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Optional } from '@angular/core';
import {
  ASM_ENABLED_LOCAL_STORAGE_KEY,
  CsAgentAuthService,
  AsmDeepLinkParameters,
  AsmDeepLinkService,
  AsmEnablerService,
} from '@spartacus/asm/root';
import { AuthService, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsmComponentService {
  protected searchparam: URLSearchParams;
  isEmulatedByDeepLink$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected showDeeplinkCartInfoAlert$: BehaviorSubject<boolean> =
    new BehaviorSubject(false);

  constructor(
    authService: AuthService,
    csAgentAuthService: CsAgentAuthService,
    winRef: WindowRef,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    asmDeepLinkService: AsmDeepLinkService,
    asmEnablerService: AsmEnablerService
  );
  /**
   * @deprecated since 7.0
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
    // TODO: Remove optional flag in 7.0 where service is used
    @Optional() protected asmDeepLinkService?: AsmDeepLinkService,
    @Optional() protected asmEnablerService?: AsmEnablerService
  ) {
    this.searchparam = new URLSearchParams(this.winRef?.location?.search);
  }

  /**
   * Returns a deep link parameter value if it is in the url.
   */
  getSearchParameter(key: string): string | undefined {
    return this.asmDeepLinkService?.getSearchParameter(key);
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
    return this.asmDeepLinkService?.isEmulateInURL() || false;
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
}
