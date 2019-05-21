import { Injectable } from '@angular/core';
import { ProductService, RoutingService, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrentProductService {
  constructor(
    private routingService: RoutingService,
    private productService: ProductService
  ) {}

  getProduct(): Observable<Product> {
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['productCode']),
      filter(productCode => !!productCode),
      switchMap((productCode: string) => this.productService.get(productCode))
    );
  }
}
