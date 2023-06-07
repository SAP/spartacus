/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Optional } from '@angular/core';
import {
  ASM_ENABLED_LOCAL_STORAGE_KEY,
  CsAgentAuthService,
} from '@spartacus/asm/root';
import { AuthService, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsmDeepLinkService } from '../asm-deep-link/asm-deep-link.service';

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
    asmDeepLinkService: AsmDeepLinkService
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
    @Optional() protected asmDeepLinkService?: AsmDeepLinkService
  ) {
    this.searchparam = new URLSearchParams(this.winRef?.location?.search);
  }

  getSearchParameter(key: string): string | null {
    return this.searchparam.get(key);
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

  getDeepLinkUrlParams() {
    return this.asmDeepLinkService?.getParamsInUrl();
  }

  handleDeepLinkParamsAfterStartSession(
    parameters = this.getDeepLinkUrlParams()
  ): void {
    this.asmDeepLinkService?.handleNavigation(parameters);
  }
}
