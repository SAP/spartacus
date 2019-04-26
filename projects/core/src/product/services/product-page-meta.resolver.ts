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
import { PageType } from '../../occ/occ-models/occ.models';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductService } from '../facade/product.service';
import { UIProduct } from '../model/product';

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
    const product$: Observable<
      UIProduct
    > = this.routingService.getRouterState().pipe(
      map(state => state.state.params['productCode']),
      filter(Boolean),
      switchMap(code => this.productService.get(code))
    );

    return product$.pipe(
      switchMap((p: UIProduct) =>
        combineLatest([
          this.resolveHeading(p),
          this.resolveTitle(p),
          this.resolveDescription(p),
          this.resolveImage(p),
        ])
      ),
      map(([heading, title, description, image]) => ({
        heading,
        title,
        description,
        image,
      }))
    );
  }

  resolveHeading(product: UIProduct): Observable<string> {
    return of(product.name);
  }

  resolveTitle(product: UIProduct): Observable<string> {
    let title = product.name;
    title += this.resolveFirstCategory(product);
    title += this.resolveManufacturer(product);

    return of(title);
  }

  resolveDescription(product: UIProduct): Observable<string> {
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

  private resolveFirstCategory(product: UIProduct): string {
    let firstCategory;
    if (product.categories && product.categories.length > 0) {
      firstCategory = product.categories[0];
    }
    return firstCategory
      ? ` | ${firstCategory.name || firstCategory.code}`
      : '';
  }

  private resolveManufacturer(product: UIProduct): string {
    return product.manufacturer ? ` | ${product.manufacturer}` : '';
  }
}
