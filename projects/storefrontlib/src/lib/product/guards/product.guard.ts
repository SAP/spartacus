import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RoutingService } from '@spartacus/core';

@Injectable()
export class ProductGuard implements CanActivate {
  productCode: string;

  constructor(private routingService: RoutingService) {
    this.routingService
      .getRouterState()
      .subscribe(
        routerState =>
          (this.productCode = routerState.state.params['productCode'])
      );
  }

  canActivate(): Observable<boolean> {
    return of(true);
  }
}
