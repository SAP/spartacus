import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CartDataService, RoutingService } from '@spartacus/core';

@Injectable()
export class EmptyCartGuard implements CanActivate {
  constructor(
    private cartDataService: CartDataService,
    private routingService: RoutingService
  ) {}

  canActivate(): boolean {
    if (this.cartDataService.hasCart) {
      return true;
    } else {
      this.routingService.go({ route: ['home'] });
      return false;
    }
  }
}
