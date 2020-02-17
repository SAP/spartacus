import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageMeta, PageRobotsMeta } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageDescriptionResolver,
  PageHeadingResolver,
  PageImageResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { FeatureConfigService } from '../../features-config/services/feature-config.service';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { Product } from '../../model/product.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductService } from '../facade/product.service';
import { ProductScope } from '../model/product-scope';

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
  protected readonly PRODUCT_SCOPE =
    this.features && this.features.isLevel('1.4') ? ProductScope.DETAILS : '';

  // reusable observable for product data based on the current page
  private product$ = this.routingService.getRouterState().pipe(
    map(state => state.state.params['productCode']),
    filter(code => !!code),
    switchMap(code => this.productService.get(code, this.PRODUCT_SCOPE)),
    filter(Boolean)
  );

  constructor(
    routingService: RoutingService,
    productService: ProductService,
    translation: TranslationService,
    // tslint:disable-next-line: unified-signatures
    features: FeatureConfigService
  );

  /**
   * @deprecated since 1.4
   */
  constructor(
    routingService: RoutingService,
    productService: ProductService,
    translation: TranslationService
  );

  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService,
    protected translation: TranslationService,
    protected features?: FeatureConfigService
  ) {
    super();
    this.pageType = PageType.PRODUCT_PAGE;
  }

  /**
   * @deprecated since version 1.3
   *
   * The resolve method is no longer preferred and will be removed with release 2.0.
   * The caller `PageMetaService` service is improved to expect all individual resolvers
   * instead, so that the code is easier extensible.
   */
  resolve(): Observable<PageMeta> | any {
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
          this.resolveRobots(p),
        ])
      ),
      map(
        ([heading, title, description, breadcrumbs, image, robots]: [
          string,
          string,
          string,
          any[],
          string,
          string[]
        ]) => ({
          heading,
          title,
          description,
          breadcrumbs,
          image,
          robots,
        })
      )
    );
  }

  resolveHeading(): Observable<string>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveHeading()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveHeading(product: Product): Observable<string>;
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

  resolveTitle(): Observable<string>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveTitle()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveTitle(product: Product): Observable<string>;
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

  resolveDescription(): Observable<string>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveDescription()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveDescription(product: Product): Observable<string>;
  resolveDescription(product?: Product): Observable<string> {
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

  resolveBreadcrumbs(): Observable<any[]>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveBreadcrumbs()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveBreadcrumbs(
    product: Product,
    breadcrumbLabel: string
  ): Observable<any[]>;
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
        for (const { name, code, url } of p.categories || []) {
          breadcrumbs.push({
            label: name || code,
            link: url,
          });
        }
        return breadcrumbs;
      })
    );
  }

  resolveImage(): Observable<string>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveImage()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveImage(product: Product): Observable<string>;
  resolveImage(product?: Product): Observable<string> {
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

  resolveRobots(): Observable<PageRobotsMeta[]>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveRobots()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveRobots(product: Product): Observable<PageRobotsMeta[]>;
  resolveRobots(product?: Product): Observable<PageRobotsMeta[]> {
    const product$ = product ? of(product) : this.product$;
    return product$.pipe(
      switchMap((p: Product) => {
        if (!p.purchasable) {
          return of([PageRobotsMeta.FOLLOW, PageRobotsMeta.NOINDEX]);
        } else {
          return of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX]);
        }
      })
    );
  }
}
