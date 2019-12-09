import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Cart, CartService, RoutingService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CartNotEmptyGuard implements CanActivate {
  constructor(
    private cartService: CartService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.cartService.getActive(),
      this.cartService.getLoaded(),
    ]).pipe(
      filter(([_, loaded]) => loaded),
      map(([cart]) => {
        if (this.isEmpty(cart)) {
          this.routingService.go({ cxRoute: 'home' });
          return false;
        }
        return true;
      })
    );
  }

  private isEmpty(cart: Cart): boolean {
    return cart && !cart.totalItems;
  }
}
