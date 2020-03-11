import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActiveCartService, Cart, RoutingService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartNotEmptyGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected activeCartService: ActiveCartService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.activeCartService.getActive(),
      this.activeCartService.getLoaded(),
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
