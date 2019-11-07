import { Injectable } from '@angular/core';
import { AuthService, RoutingService } from '@spartacus/core';
import { take } from 'rxjs/operators';

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
        if (Boolean(token) && token.access_token) {
          this.logoutCustomer();
        }
        this.authService.logoutCustomerSupportAgent();
      });
  }

  logoutCustomer(): void {
    this.authService.logout();
    this.routingService.go({ cxRoute: 'home' });
  }
}
