import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import {
  Page,
  PageMeta,
  USE_SEPARATE_RESOLVERS,
} from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { ProductSearchPage } from '../../model/product-search.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  private searchPage$: Observable<
    ProductSearchPage | Page
  > = this.cms.getCurrentPage().pipe(
    filter(Boolean),
    switchMap((page: Page) =>
      // only the existence of a plp component tells us if products
      // are rendered or if this is an ordinary content page
      this.hasProductListComponent(page)
        ? this.productSearchService.getResults()
        : of(page)
    )
  );

  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CATEGORY_PAGE;
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
    return combineLatest([this.resolveTitle(), this.resolveBreadcrumbs()]).pipe(
      map(([title, breadcrumbs]) => ({
        title,
        breadcrumbs,
      }))
    );
  }

  /**
   * @deprecated since version 1.3
   * The `page` argument will get removed with 2.0, it is already made optional in 1.3.
   */
  resolveTitle(page?: ProductSearchPage): Observable<{ title: string } | any> {
    if (page) {
      return this.translation.translate('pageMetaResolver.category.title', {
        count: (<ProductSearchPage>page).pagination.totalResults,
        query: (<ProductSearchPage>page).breadcrumbs[0].facetValueName,
      });
    } else {
      return this.searchPage$.pipe(
        switchMap(p =>
          this.translation.translate('pageMetaResolver.category.title', {
            count: (<ProductSearchPage>p).pagination.totalResults,
            query: (<ProductSearchPage>p).breadcrumbs[0].facetValueName,
          })
        ),
        map(label => ({ title: label }))
      );
    }
  }

  /**
   * @deprecated since version 1.3
   * This method will removed with with 2.0
   */
  resolveBreadcrumbLabel(): Observable<string> {
    return this.translation.translate('common.home');
  }

  /**
   * @deprecated since version 1.3
   * The arguments will get removed with 2.0. They've already made optional in 1.3.
   */
  resolveBreadcrumbs(
    page?: ProductSearchPage,
    breadcrumbLabel?: string
  ): Observable<any[] | any> {
    if (page && breadcrumbLabel) {
      return page.breadcrumbs
        ? this.translation
            .translate('common.home')
            .pipe(
              map(label =>
                this.resolveBreadcrumbData(<ProductSearchPage>page, label)
              )
            )
        : of(null);
    } else {
      return combineLatest([
        this.searchPage$.pipe(),
        this.translation.translate('common.home'),
      ]).pipe(
        switchMap(p =>
          (<ProductSearchPage>p).breadcrumbs
            ? this.translation.translate('common.home').pipe(
                map(label =>
                  this.resolveBreadcrumbData(<ProductSearchPage>p, label)
                ),
                map(breadcrumbs => ({ breadcrumbs }))
              )
            : of(null)
        )
      );
    }
  }

  private resolveBreadcrumbData(page: ProductSearchPage, label: string): any[] {
    const breadcrumbs = [];
    breadcrumbs.push({ label: label, link: '/' });

    for (const br of page.breadcrumbs) {
      if (br.facetCode === 'category') {
        breadcrumbs.push({
          label: br.facetValueName,
          link: `/c/${br.facetValueCode}`,
        });
      }
      if (br.facetCode === 'brand') {
        breadcrumbs.push({
          label: br.facetValueName,
          link: `/Brands/${br.facetValueName}/c/${br.facetValueCode}`,
        });
      }
    }
    return breadcrumbs;
  }

  private hasProductListComponent(page: Page): boolean {
    return !!Object.keys(page.slots).find(
      key =>
        !!page.slots[key].components.find(
          comp => comp.typeCode === 'CMSProductListComponent'
        )
    );
  }
}
