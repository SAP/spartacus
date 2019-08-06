import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  AuthRedirectService,
  AuthService,
  CartService,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutAuthGuard implements CanActivate {
  constructor(
    private routingService: RoutingService,
    private authService: AuthService,
    private authRedirectService: AuthRedirectService,
    private cartService: CartService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest(
      this.authService.getUserToken(),
      this.cartService.getAssignedUser()
    ).pipe(
      map(([token, user]) => {
        if (!token.access_token) {
          console.log(user);
          if (user && user.name === 'guest') {
            console.log('in', Boolean(user));

            return Boolean(user);
          }
          this.routingService.go({ cxRoute: 'login' }, { forced: true });
          this.authRedirectService.reportAuthGuard();
        }
        return !!token.access_token;
      })
    );
    // return this.authService.getUserToken().pipe(
    //   map((token: UserToken) => {
    //     if (!token.access_token) {
    //       this.cartService.getActive().pipe(
    //         map((cart: Cart) => {
    //           return console.log(cart);
    //         })
    //       );
    //       // this.routingService.go({ cxRoute: 'login' }, { forced: true });
    //       // this.authRedirectService.reportAuthGuard();
    //     }
    //     return !!token.access_token;
    //   })
    // );
  }
}
