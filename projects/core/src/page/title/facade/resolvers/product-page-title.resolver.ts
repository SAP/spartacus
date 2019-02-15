import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RoutingService } from '../../../../routing/index';
import { map, filter, switchMap } from 'rxjs/operators';
import { ProductService } from '../../../../product/facade/index';

import { Page } from '../../../../cms/model/page.model';
import { PageType } from '../../../../occ/occ-models/occ.models';
import { PageTitleResolver } from './page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class ProductPageTitleResolver extends PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService
  ) {
    super();
  }

  hasMatch(page: Page) {
    return page.type === PageType.PRODUCT_PAGE;
  }

  resolve(): Observable<string> {
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['productCode']),
      filter(Boolean),
      switchMap(code =>
        this.productService.get(code).pipe(
          filter(Boolean),
          map(p => p.name)
        )
      )
    );
  }
}
