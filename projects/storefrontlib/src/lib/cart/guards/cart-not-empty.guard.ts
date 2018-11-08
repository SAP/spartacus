import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import * as fromStore from './../../cart/store';

import { CartService } from '../../cart/services/cart.service';
import { skipWhile, map, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { PathService } from '@spartacus/core';

@Injectable()
export class CartNotEmptyGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.CartState>,
    private cartService: CartService,
    private router: Router,
    private pathService: PathService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoaded),
      skipWhile(loaded => !loaded),
      switchMap(() => this.store.pipe(select(fromStore.getActiveCart))),
      map(cart => {
        if (this.cartService.isCartEmpty(cart)) {
          this.router.navigate([this.pathService.transform('homepage')]);
          return false;
        }
        return true;
      })
    );
  }
}
