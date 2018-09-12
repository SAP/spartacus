import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import * as fromStore from './../../cart/store';

import { CartService } from '../../cart/services/cart.service';
import { skipWhile, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class CartNotEmptyGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.CartState>,
    private cartService: CartService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromStore.getActiveCart)
      .pipe(skipWhile(cart => !this.cartService.isCartCreated(cart)))
      .pipe(
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
