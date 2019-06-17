import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CartService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartNotEmptyGuard implements CanActivate {
  constructor(
    private cartService: CartService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean> {
    return this.cartService.getActive().pipe(
      map(cart => {
        if (this.cartService.isEmpty(cart)) {
          this.routingService.go({ cxRoute: 'home' });
          return false;
        }
        return true;
      })
    );
  }
}
