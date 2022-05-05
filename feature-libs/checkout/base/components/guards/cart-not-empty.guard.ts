import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { SemanticPathService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartNotEmptyGuard implements CanActivate {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.activeCartFacade.getActive(),
      this.activeCartFacade.isStable(),
    ]).pipe(
      filter(([_, loaded]) => loaded),
      map(([cart]) => {
        if (this.isEmpty(cart)) {
          return this.router.parseUrl(this.semanticPathService.get('home'));
        }
        return true;
      })
    );
  }

  private isEmpty(cart: Cart): boolean {
    return cart && !cart.totalItems;
  }
}
