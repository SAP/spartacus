import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import { UserIdService, ActiveCartService } from '@spartacus/core';
import { map, tap } from 'rxjs/operators';
import { CartModificationList } from '@spartacus/cart/validation/core';

@Injectable({
  providedIn: 'root',
})
export class CartValidationGuard implements CanActivate {
  constructor(
    protected cartValidationService: CartValidationFacade,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.cartValidationService.getCartModificationList().pipe(
      tap((d) => console.log('Cart validity:', d)),
      map(
        (cartModificationList: CartModificationList) =>
          !cartModificationList.cartModifications?.length
      )
    );
  }
}
