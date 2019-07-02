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
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { Product } from '../../model/product.model';
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
    PageBreadcrumbResolver,
    PageImageResolver {
  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService,
    protected translation: TranslationService
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
      switchMap((p: Product) =>
        combineLatest([
          this.resolveHeading(p),
          this.resolveTitle(p),
          this.resolveDescription(p),
          this.resolveBreadcrumbLabel().pipe(
            switchMap(label => this.resolveBreadcrumbs(p, label))
          ),
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

  resolveHeading(product: Product): Observable<string> {
    return this.translation.translate('pageMetaResolver.product.heading', {
      heading: product.name,
    });
  }

  resolveTitle(product: Product): Observable<string> {
    let title = product.name;
    title += this.resolveFirstCategory(product);
    title += this.resolveManufacturer(product);

    return this.translation.translate('pageMetaResolver.product.title', {
      title: title,
    });
  }

  resolveDescription(product: Product): Observable<string> {
    return this.translation.translate('pageMetaResolver.product.description', {
      description: product.summary,
    });
  }

  resolveBreadcrumbLabel(): Observable<string> {
    return this.translation.translate('common.home');
  }

  resolveBreadcrumbs(
    product: Product,
    breadcrumbLabel: string
  ): Observable<any[]> {
    const breadcrumbs = [];
    breadcrumbs.push({ label: breadcrumbLabel, link: '/' });
    for (const { name, code, url } of product.categories) {
      breadcrumbs.push({
        label: name || code,
        link: url,
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
