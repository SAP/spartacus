import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderReturnService } from './order-return.service';

@Injectable({
  providedIn: 'root',
})
export class OrderReturnGuard implements CanActivate {
  constructor(
    protected routing: RoutingService,
    protected orderAmendService: OrderReturnService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.orderAmendService.getForm().pipe(
      map(form => {
        if (!form.valid) {
          // the order code is not available in the route
          // as long as we're inside a guard, hence we redirect
          // to the common orders page.
          this.routing.go({ cxRoute: 'orders' });
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
