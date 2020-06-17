import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { BreadcrumbMeta, Page } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { ActivatedRoute, UrlSegment, Params } from '@angular/router';
import { RoutingService } from '../../routing/facade/routing.service';
import { RouterState } from '../../routing/store/routing-state';

/**
 * Resolves the page data for Organization Pages.
 *
 * The page title, and breadcrumbs are built in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class OrganizationMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  protected organizationPage$: Observable<
    UrlSegment
  > = this.cms.getCurrentPage().pipe(
    filter(Boolean),
    switchMap((page: Page) =>
      // checking the template to make sure it's a 'my company' page
      this.isCompanyPage(page) ? this.route.snapshot.children[0].url : null
    )
  );

  constructor(
    protected routingService: RoutingService,
    protected route: ActivatedRoute,
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'CompanyPageTemplate';
  }

  resolveTitle(): Observable<string> {
    return combineLatest([
      this.organizationPage$,
      this.routingService.getRouterState(),
    ]).pipe(
      filter(([url, routerState]) => Boolean(url) && Boolean(routerState)),
      switchMap(([url, { state: { params } }]) =>
        Object.keys(params).length && Object.values(params).includes(url.path)
          ? of(url.path)
          : this.translation.translate(`breadcrumbs.${url.path}`)
      )
    );
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.translation.translate('common.home'),
      this.routingService.getRouterState(),
    ]).pipe(
      map(([homeLabel, routerState]: [string, RouterState]) =>
        this.resolveBreadcrumbData(homeLabel, routerState.state.params)
      )
    );
  }

  protected resolveBreadcrumbData(
    homeLabel: string,
    params: Params
  ): BreadcrumbMeta[] {
    const breadcrumbs: BreadcrumbMeta[] = [];
    let path = '';
    breadcrumbs.push({ label: homeLabel, link: '/' });
    this.route.snapshot.children[0].url
      .filter((_, index, arr) => index !== arr.length - 1)
      .forEach((url) => {
        path = `${path}/${url.path}`;
        this.translation
          .translate(`breadcrumbs.${url.path}`)
          .subscribe((translation) =>
            breadcrumbs.push({
              label:
                Object.keys(params).length &&
                Object.values(params).includes(url.path)
                  ? url.path
                  : translation,
              link: `${path}`,
            })
          );
      });
    return breadcrumbs;
  }

  protected isCompanyPage(page: Page): boolean {
    return page.template === 'CompanyPageTemplate';
  }
}
