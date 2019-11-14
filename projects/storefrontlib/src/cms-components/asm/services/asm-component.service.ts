import { Injectable } from '@angular/core';
import { AuthService, RoutingService, WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ASM_ENABLED_LOCAL_STORAGE_KEY } from '../asm-constants';

@Injectable({
  providedIn: 'root',
})
export class AsmComponentService {
  constructor(
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected winRef: WindowRef
  ) {}

  logoutCustomerSupportAgentAndCustomer(): void {
    this.authService
      .getUserToken()
      .pipe(take(1))
      .subscribe(token => {
        if (this.authService.isCustomerEmulationToken(token)) {
          this.logoutCustomer();
        }
        this.authService.logoutCustomerSupportAgent();
      });
  }

  logoutCustomer(): void {
    this.authService.logout();
    this.routingService.go({ cxRoute: 'home' });
  }

  isCustomerEmulationSessionInProgress(): Observable<boolean> {
    return this.authService
      .getUserToken()
      .pipe(
        mergeMap(userToken =>
          of(this.authService.isCustomerEmulationToken(userToken))
        )
      );
  }

  /**
   * We're currently only removing the persisted storage in the browser
   * to ensure the ASM experience isn't loaded on the next visit. There are a few
   * optimsiations we could think of:
   * - drop the `asm` parameter from the URL, in case it's still there
   * - remove the generated UI from the DOM (outlets currently do not support this)
   */
  unload() {
    if (this.winRef.localStorage) {
      this.winRef.localStorage.removeItem(ASM_ENABLED_LOCAL_STORAGE_KEY);
    }
  }
}
