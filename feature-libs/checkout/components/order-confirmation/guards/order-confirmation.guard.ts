import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationGuard implements CanActivate {
  constructor(
    private checkoutService: CheckoutFacade,
    private router: Router,
    private semanticPathService: SemanticPathService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkoutService.getOrderDetails().pipe(
      map((orderDetails) => {
        if (orderDetails && Object.keys(orderDetails).length !== 0) {
          return true;
        } else {
          return this.router.parseUrl(this.semanticPathService.get('orders'));
        }
      })
    );
  }
}
