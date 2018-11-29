import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { RoutingService, ProductService } from '@spartacus/core';

@Injectable()
export class ProductGuard implements CanActivate {
  productCode: string;

  constructor(
    private routingService: RoutingService,
    private productService: ProductService
  ) {
    this.routingService.routerState$.subscribe(
      routerState =>
        (this.productCode = routerState.state.params['productCode'])
    );
  }

  canActivate(): Observable<boolean> {
    return this.productService.isProductLoaded(this.productCode).pipe(
      switchMap(found => of(found)),
      catchError(_err => of(false))
    );
  }
}
