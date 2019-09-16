import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { Page, PageMeta } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageTitleResolver } from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { ProductSearchPage } from '../../model/product-search.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CATEGORY_PAGE;
  }

  resolve(): Observable<PageMeta> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap((page: Page) => {
        // only the existence of a plp component tells us if products
        // are rendered or if this is an ordinary content page
        if (this.hasProductListComponent(page)) {
          return this.productSearchService.getResults().pipe(
            filter(data => data.breadcrumbs && data.breadcrumbs.length > 0),
            switchMap(data =>
              combineLatest([
                this.resolveTitle(data),
                this.resolveBreadcrumbLabel().pipe(
                  switchMap(label => this.resolveBreadcrumbs(data, label))
                ),
              ])
            ),
            map(([title, breadcrumbs]) => ({ title, breadcrumbs }))
          );
        } else {
          return of({
            title: page.title || page.name,
          });
        }
      })
    );
  }

  resolveTitle(data: ProductSearchPage): Observable<string> {
    return this.translation.translate('pageMetaResolver.category.title', {
      count: data.pagination.totalResults,
      query: data.breadcrumbs[0].facetValueName,
    });
  }

  resolveBreadcrumbLabel(): Observable<string> {
    return this.translation.translate('common.home');
  }

  resolveBreadcrumbs(
    data: ProductSearchPage,
    breadcrumbLabel: string
  ): Observable<any[]> {
    const breadcrumbs = [];
    breadcrumbs.push({ label: breadcrumbLabel, link: '/' });
    for (const br of data.breadcrumbs) {
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
    return of(breadcrumbs);
  }

  private hasProductListComponent(page: Page): boolean {
    // ProductListComponent
    return !!Object.keys(page.slots).find(
      key =>
        !!page.slots[key].components.find(
          comp => comp.typeCode === 'CMSProductListComponent'
        )
    );
  }
}
