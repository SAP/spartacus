import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
          map((p: Product) => {
            return <PageMeta>{
              heading: this.resolveHeading(p),
              title: this.resolveTitle(p),
              description: this.resolveDescription(p),
              image: this.resolveImage(p),
            };
          })
        )
      )
    );
  }

  resolveHeading(product: Product): string {
    return product.name;
  }

  resolveTitle(product: Product): string {
    let title = product.name;
    title += this.resolveFirstCategory(product);
    title += this.resolveManufactorer(product);

    return title;
  }

  resolveDescription(product: Product): string {
    return product.summary;
  }

  resolveImage(product: any): string {
    if (
      product.images &&
      product.images.PRIMARY &&
      product.images.PRIMARY.zoom &&
      product.images.PRIMARY.zoom.url
    ) {
      return product.images.PRIMARY.zoom.url;
    }
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

  private resolveManufactorer(product: Product): string {
    return product.manufacturer ? ` | ${product.manufacturer}` : '';
  }
}
