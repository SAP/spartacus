import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderCancellationService } from './order-cancellation.service';

@Injectable({
  providedIn: 'root',
})
export class OrderCancellationGuard implements CanActivate {
  constructor(
    protected orderAmendService: OrderCancellationService,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.orderAmendService.getForm().pipe(
      map((form) => {
        if (!form.valid) {
          // the order code is not available in the route
          // as long as we're inside a guard, hence we redirect
          // to the common orders page.
          return this.router.parseUrl(this.semanticPathService.get('orders'));
        } else {
          return true;
        }
      })
    );
  }
}
