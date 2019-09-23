import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService, CartService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotCheckoutAuthGuard implements CanActivate {
  constructor(
    private routingService: RoutingService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserToken().pipe(
      map(token => {
        if (token.access_token) {
          this.routingService.go({ cxRoute: 'home' });
        } else if (this.cartService.isGuestCart()) {
          this.routingService.go({ cxRoute: 'cart' });
          return false;
        }
        return !token.access_token;
      })
    );
  }
}
