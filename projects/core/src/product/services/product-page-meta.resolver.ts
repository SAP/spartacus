import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageMeta, USE_SEPARATE_RESOLVERS } from '../../cms/model/page.model';
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

/**
 * Resolves the page data for the Product Detail Page
 * based on the `PageType.PRODUCT_PAGE`.
 *
 * The page title, heading, description, breadcrumbs and
 * first GALLERY image are resolved if available in the data.
 */
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
  // resuable observable for product data based on the current page
  private product$ = this.routingService.getRouterState().pipe(
    map(state => state.state.params['productCode']),
    filter(code => !!code),
    switchMap(code => this.productService.get(code)),
    filter(Boolean)
  );

  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.PRODUCT_PAGE;
  }

  /**
   * The resolve method is no longer preferred and will be removed with release 2.0.
   * The caller `PageMetaService` service is improved to expect all individual resolvers
   * instead, so that the code is easier extensible.
   *
   * @param skip indicates that this method is not used. While this flag is used by the
   * calling `PageMetaService`, it is not used by custom subclasses when they call their `super`.
   * This is a temporaty solution to stay backwards compatible during release 1.x.
   *
   * @deprecated since version 1.3
   */
  resolve(skip?: boolean): Observable<PageMeta> | any {
    if (skip) {
      return USE_SEPARATE_RESOLVERS;
    }

    return this.product$.pipe(
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
      map(
        ([heading, title, description, breadcrumbs, image]: [
          string,
          string,
          string,
          any[],
          string
        ]) => ({
          heading,
          title,
          description,
          breadcrumbs,
          image,
        })
      )
    );
  }

  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   */
  resolveHeading(product?: Product): Observable<string> {
    const product$ = product ? of(product) : this.product$;
    return product$.pipe(
      switchMap((p: Product) =>
        this.translation.translate('pageMetaResolver.product.heading', {
          heading: p.name,
        })
      )
    );
  }

  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   */
  resolveTitle(product?: Product): Observable<string> {
    const product$ = product ? of(product) : this.product$;
    return product$.pipe(
      switchMap((p: Product) => {
        let title = p.name;
        title += this.resolveFirstCategory(p);
        title += this.resolveManufacturer(p);
        return this.translation.translate('pageMetaResolver.product.title', {
          title: title,
        });
      })
    );
  }

  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   */
  resolveDescription(
    product?: Product
  ): Observable<{ description: string } | any> {
    const product$: Observable<Product> = product ? of(product) : this.product$;
    return product$.pipe(
      switchMap((p: Product) =>
        this.translation.translate('pageMetaResolver.product.description', {
          description: p.summary,
        })
      )
    );
  }

  /**
   * @deprecated since version 1.3
   * This method will be removed with with 2.0
   */
  resolveBreadcrumbLabel(): Observable<string> {
    return this.translation.translate('common.home');
  }

  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   */
  resolveBreadcrumbs(
    product?: Product,
    breadcrumbLabel?: string
  ): Observable<any[]> {
    const sources =
      product && breadcrumbLabel
        ? [of(product), of(breadcrumbLabel)]
        : [this.product$.pipe(), this.translation.translate('common.home')];

    return combineLatest(sources).pipe(
      map(([p, label]: [Product, string]) => {
        const breadcrumbs = [];
        breadcrumbs.push({ label: label, link: '/' });
        for (const { name, code, url } of p.categories) {
          breadcrumbs.push({
            label: name || code,
            link: url,
          });
        }
        return breadcrumbs;
      })
    );
  }

  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   */
  resolveImage(product?: Product): Observable<{ image: string } | any> {
    const product$: Observable<Product> = product ? of(product) : this.product$;
    return product$.pipe(
      map((p: Product) =>
        p.images &&
        p.images.PRIMARY &&
        (<any>p.images.PRIMARY).zoom &&
        (<any>p.images.PRIMARY).zoom.url
          ? (<any>p.images.PRIMARY).zoom.url
          : null
      )
    );
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
