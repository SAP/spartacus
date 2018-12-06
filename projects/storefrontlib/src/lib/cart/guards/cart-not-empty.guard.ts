import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { skipWhile, map, switchMap } from 'rxjs/operators';

import { CartService } from '../../cart/facade/cart.service';

@Injectable()
export class CartNotEmptyGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.cartService.getLoaded().pipe(
      skipWhile(loaded => !loaded),
      switchMap(() => this.cartService.getActiveCart()),
      map(cart => {
        if (this.cartService.isCartEmpty(cart)) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      })
    );
  }
}
