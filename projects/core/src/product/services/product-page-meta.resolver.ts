import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageMeta } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageDescriptionResolver,
  PageHeadingResolver,
  PageImageResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { PageType, Product } from '../../occ/occ-models/occ.models';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductService } from '../facade/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductPageMetaResolver extends PageMetaResolver
  implements
    PageHeadingResolver,
    PageTitleResolver,
    PageDescriptionResolver,
    PageImageResolver {
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
          switchMap((p: Product) =>
            combineLatest([
              this.resolveHeading(p),
              this.resolveTitle(p),
              this.resolveDescription(p),
              this.resolveImage(p),
            ])
          ),
          map(([heading, title, description, image]) => {
            console.log([heading, title, description, image]);
            debugger;
            return {
              heading,
              title,
              description,
              image,
            };
          })
        )
      )
    );
  }

  resolveHeading(product: Product): Observable<string> {
    return of(product.name);
  }

  resolveTitle(product: Product): Observable<string> {
    let title = product.name;
    title += this.resolveFirstCategory(product);
    title += this.resolveManufacturer(product);

    return of(title);
  }

  resolveDescription(product: Product): Observable<string> {
    return of(product.summary);
  }

  resolveImage(product: any): Observable<string> {
    let result;
    if (
      product.images &&
      product.images.PRIMARY &&
      product.images.PRIMARY.zoom &&
      product.images.PRIMARY.zoom.url
    ) {
      result = product.images.PRIMARY.zoom.url;
    }
    return of(result);
  }

  private resolveFirstCategory(product: Product): string {
    let firstCategory;
    if (product.categories && product.categories.length > 0) {
      firstCategory = product.categories[0];
    }
    return firstCategory
      ? ` | ${firstCategory.name || firstCategory.code}`
      : '';
  }

  private resolveManufacturer(product: Product): string {
    return product.manufacturer ? ` | ${product.manufacturer}` : '';
  }
}
