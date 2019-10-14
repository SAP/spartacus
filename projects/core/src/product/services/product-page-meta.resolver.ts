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
  /**
   * all resolvers need the product as an input
   */
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
   * calling `PageMetaService`, it is not ysed by custom subclasses when they call their `super`.
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
      map(([heading, title, description, breadcrumbs, image]: //
      [string, string, string, any[], string]) => ({
        heading,
        title,
        description,
        breadcrumbs,
        image,
      }))
    );
  }

  /**
   * @deprecated since version 1.3
   * The `product` argument will be removed with 2.0. The argument is optional since 1.3.
   */
  resolveHeading(_product?: Product): Observable<{ heading: string } | string> {
    return this.product$.pipe(
      switchMap((product: Product) =>
        this.translation.translate('pageMetaResolver.product.heading', {
          heading: product.name,
        })
      ),
      map(heading => {
        // in the 1.x release we keep supporting the existing return value
        return _product ? heading : { heading };
      })
    );
  }

  /**
   * @deprecated since version 1.3
   * The `product` argument will be removed with 2.0. The argument is optional since 1.3.
   */
  resolveTitle(_product?: Product): Observable<{ title: string } | string> {
    return this.product$.pipe(
      switchMap((p: Product) => {
        let title = p.name;
        title += this.resolveFirstCategory(p);
        title += this.resolveManufacturer(p);
        return this.translation.translate('pageMetaResolver.product.title', {
          title: title,
        });
      }),
      map(title => {
        // in the 1.x release we keep supporting the existing return value
        return _product ? title : { title };
      })
    );
  }

  /**
   * @deprecated since version 1.3
   * The `product` argument will be removed with 2.0. The argument is optional since 1.3.
   */
  resolveDescription(
    _product?: Product
  ): Observable<{ description: string } | string> {
    return this.product$.pipe(
      switchMap((product: Product) =>
        this.translation.translate('pageMetaResolver.product.description', {
          description: product.summary,
        })
      ),
      map(description => {
        // in the 1.x release we keep supporting the existing return value
        return _product ? description : { description: description };
      })
    );
  }

  /**
   * @deprecated since version 1.3
   * This method will removed with with 2.0
   */
  resolveBreadcrumbLabel(): Observable<string> {
    return this.translation.translate('common.home');
  }

  /**
   * @deprecated
   * since version 1.3. The arguments will get removed with 2.0. They've already made optional in 1.3.
   * The `product` and `breadcrumbLabel` argument will be removed with 2.0. They've already
   * become optional in 1.2.
   */
  resolveBreadcrumbs(
    _product?: Product,
    _breadcrumbLabel?: string
  ): Observable<{ breadcrumbs: any[] } | any[]> {
    return combineLatest([
      this.product$.pipe(),
      this.translation.translate('common.home'),
    ]).pipe(
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
      }),
      map(breadcrumbs => {
        // in the 1.x release we keep supporting the existing return value
        return _product ? breadcrumbs : { breadcrumbs: breadcrumbs };
      })
    );
  }

  /**
   *
   * @param product
   *
   * @deprecated since version 1.3
   *
   * In version 2.0, the resolveImage will not have arguments anymore
   * and the responsetype includes the property, `{image: string}`.
   */
  resolveImage(product?: Product): Observable<any> {
    if (product) {
      return of(this.getPrimaryImage(product));
    } else {
      return this.product$.pipe(
        map((p: Product) => this.getPrimaryImage(p)),
        map(image => ({ image }))
      );
    }
  }

  private getPrimaryImage(product: Product): boolean {
    return product.images &&
      product.images.PRIMARY &&
      (<any>product.images.PRIMARY).zoom &&
      (<any>product.images.PRIMARY).zoom.url
      ? (<any>product.images.PRIMARY).zoom.url
      : null;
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
