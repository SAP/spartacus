import { Injectable } from '@angular/core';
import { AuthService, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AsmComponentService {
  constructor(
    private authService: AuthService,
    private routingService: RoutingService
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
}
