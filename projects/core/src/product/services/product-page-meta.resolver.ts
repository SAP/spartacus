import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageMeta } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
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
    PageBreadcrumbResolver,
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
      switchMap(code => this.productService.get(code)),
      filter(Boolean),
      switchMap((p: UIProduct) =>
        combineLatest([
          this.resolveHeading(p),
          this.resolveTitle(p),
          this.resolveDescription(p),
          this.resolveBreadcrumbs(p),
          this.resolveImage(p),
        ])
      ),
      map(([heading, title, description, breadcrumbs, image]) => ({
        heading,
        title,
        description,
        breadcrumbs,
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

  resolveBreadcrumbs(product: UIProduct): Observable<any[]> {
    const breadcrumbs = [];
    breadcrumbs.push({ label: 'Home', link: '/' });
    for (const c of product.categories) {
      breadcrumbs.push({
        label: c.name || c.code,
        link: '/c/' + c.code,
      });
    }
    return of(breadcrumbs);
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
