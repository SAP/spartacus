import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductService } from '../../product/facade/product.service';
import { PageType, Product } from '../../occ/occ-models/occ.models';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageMeta } from '../../cms/model/page.model';
import {
  PageTitleResolver,
  PageDescriptionResolver
} from '../../cms/page/page.resolvers';

@Injectable({
  providedIn: 'root'
})
export class ProductPageTitleResolver extends PageMetaResolver
  implements PageTitleResolver, PageDescriptionResolver {
  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService
  ) {
    super();
    this.pageType = PageType.PRODUCT_PAGE;
  }

  resolve(): Observable<PageMeta> {
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['productCode']),
      filter(Boolean),
      switchMap(code =>
        this.productService.get(code).pipe(
          filter(Boolean),
          map((p: Product) => {
            return {
              title: this.resolveTitle(p),
              description: this.resolveDescription(p)
            };
          })
        )
      )
    );
  }

  resolveTitle(product: Product) {
    return product.name;
  }

  resolveDescription(product: Product) {
    return product.summary;
  }
}
