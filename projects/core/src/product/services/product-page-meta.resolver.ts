import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { BreadcrumbMeta, PageRobotsMeta } from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageDescriptionResolver,
  PageHeadingResolver,
  PageImageResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { PageLinkFactory } from '../../cms/page/routing/page-link.factory';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { Category, Product } from '../../model/product.model';
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
export class ProductPageMetaResolver
  extends PageMetaResolver
  implements
    PageHeadingResolver,
    PageTitleResolver,
    PageDescriptionResolver,
    PageBreadcrumbResolver,
    PageImageResolver,
    PageRobotsResolver {
  // reusable observable for product data based on the current page
  protected product$: Observable<
    Product
  > = this.routingService.getRouterState().pipe(
    map((state) => state.state.params['productCode']),
    filter((code) => !!code),
    switchMap((code) => this.productService.get(code, ProductScope.DETAILS)),
    filter((p) => Boolean(p))
  );

  /**
   * @deprecated since 3.1, we'll use the BasePageMetaResolver in future versions
   */
  // TODO(#10467): Remove deprecated constructors
  constructor(
    routingService: RoutingService,
    productService: ProductService,
    translation: TranslationService
  );
  constructor(
    routingService: RoutingService,
    productService: ProductService,
    translation: TranslationService,
    // tslint:disable-next-line: unified-signatures
    basePageMetaResolver?: BasePageMetaResolver
  );
  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService,
    protected translation: TranslationService,
    protected basePageMetaResolver?: BasePageMetaResolver,
    protected pageLinkFactory?: PageLinkFactory
  ) {
    super();
    this.pageType = PageType.PRODUCT_PAGE;
  }

  /**
   * Resolves the page heading for the Product Detail Page.
   * The page heading is used in the UI (`<h1>`), where as the page
   * title is used by the browser and crawlers.
   */
  resolveHeading(): Observable<string> {
    return this.product$.pipe(
      switchMap((p: Product) =>
        this.translation.translate('pageMetaResolver.product.heading', {
          heading: p.name,
        })
      )
    );
  }

  /**
   * Resolves the page title for the Product Detail Page. The page title
   * is resolved with the product name, the first category and the manufacturer.
   * The page title used by the browser (history, tabs) and crawlers.
   */
  resolveTitle(): Observable<string> {
    return this.product$.pipe(
      switchMap((product) => {
        let title = product.name;
        title += this.resolveFirstCategory(product);
        title += this.resolveManufacturer(product);
        return this.translation.translate('pageMetaResolver.product.title', {
          title: title,
        });
      })
    );
  }

  /**
   * Resolves the page description for the Product Detail Page. The description
   * is based on the `product.summary`.
   */
  resolveDescription(): Observable<string> {
    return this.product$.pipe(
      switchMap((product) =>
        this.translation.translate('pageMetaResolver.product.description', {
          description: product.summary,
        })
      )
    );
  }

  /**
   * Resolves breadcrumbs for the Product Detail Page. The breadcrumbs are driven by
   * a static home page crumb and a crumb for each category.
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.product$.pipe(),
      this.translation.translate('common.home'),
    ]).pipe(
      map(([product, label]) => {
        const breadcrumbs = [];
        breadcrumbs.push({ label, link: '/' });
        for (const { name, code, url } of product.categories || []) {
          breadcrumbs.push({
            label: name || code,
            link: url,
          } as BreadcrumbMeta);
        }
        return breadcrumbs;
      })
    );
  }

  /**
   * Resolves the main page image for the Product Detail Page. The product image
   * is based on the PRIMARY product image. The zoom format is used by default.
   */
  resolveImage(): Observable<string> {
    return this.product$.pipe(
      map((product) => (<any>product.images?.PRIMARY)?.zoom?.url ?? null)
    );
  }

  protected resolveFirstCategory(product: Product): string {
    const firstCategory: Category | undefined = product?.categories?.[0];

    return firstCategory
      ? ` | ${firstCategory.name || firstCategory.code}`
      : '';
  }

  protected resolveManufacturer(product: Product): string {
    return product.manufacturer ? ` | ${product.manufacturer}` : '';
  }

  /**
   * Resolves the robot information for the Product Detail Page. The
   * robot instruction defaults to FOLLOW and INDEX for all product pages,
   * regardless of whether they're purchasable or not.
   */
  // TODO(#10467): resolve robots from `BasePageMetaResolver` instead
  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX]);
  }

  /**
   * Resolves the canonical url for the product page using the default canonical url
   * configuration.
   *
   * In case of a variant product, the baseProduct code is used to resolve the url. It's important
   * to know that this has a few limitations:
   * - We're not always able to get the super baseProduct, in case of multi-level variants.
   *   OCC only exposes the direct baseProduct, which might still not resolve in the correct
   *   canonical URL. This is business driven and subject to change in a customization.
   * - The url resolved for the variant doesn't contain any content other then the product code.
   *   This means that we do not provide any product data to resolve pretty URLs (for example
   *   the product title).
   */
  resolveCanonicalUrl(): Observable<string> {
    return this.product$.pipe(
      switchMap((product) => this.findBaseProduct(product)),
      map((product) => {
        const url = this.routingService.getFullUrl({
          cxRoute: 'product',
          params: product,
        });
        // TODO (#10467): remove optional pageLinkFactory and undefined assertion when we pageLinkFactory becomes default
        return this.pageLinkFactory?.resolveCanonicalUrl({}, url) ?? '';
      })
    );
  }

  /**
   * Resolves the base product whenever the given product is a variant product.
   *
   * Since product variants can be multi-layered, we recursively try to find the base product
   * this might be too opinionated for your business though.
   */
  protected findBaseProduct(product: Product): Observable<Product> {
    if (product.baseProduct) {
      return this.productService
        .get(product.baseProduct, ProductScope.LIST)
        .pipe(switchMap((product) => this.findBaseProduct(product)));
    }
    return of(product);
  }
}
