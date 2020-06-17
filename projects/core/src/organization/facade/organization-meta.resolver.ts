import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap, mergeMap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { BreadcrumbMeta, Page } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { ActivatedRoute, UrlSegment } from '@angular/router';
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
      mergeMap(([url, routerState]) =>
        Object.keys(routerState.state.params).length
          ? of(url.path)
          : this.translation.translate(`breadcrumbs.${url.path}`)
      )
    );
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.translation.translate('common.home'),
      this.translation.translate('pageMetaResolver.organization.home'),
      this.routingService.getRouterState(),
    ]).pipe(
      map(
        ([homeLabel, organizationLabel, routerState]: [
          string,
          string,
          RouterState
        ]) =>
          this.resolveBreadcrumbData(
            homeLabel,
            organizationLabel,
            Boolean(Object.keys(routerState.state.params).length)
          )
      )
    );
  }

  protected resolveBreadcrumbData(
    homeLabel: string,
    organizationLabel: string,
    isParameter: boolean
  ): BreadcrumbMeta[] {
    const breadcrumbs: BreadcrumbMeta[] = [];
    breadcrumbs.push({ label: homeLabel, link: '/' });
    breadcrumbs.push({ label: organizationLabel, link: '/organization' });
    let path = '/organization';
    for (let i = 1; i < this.route.snapshot.children[0].url.length - 1; i++) {
      const url = this.route.snapshot.children[0].url[i];
      path = `${path}/${url.path}`;
      this.translation
        .translate(`breadcrumbs.${url.path}`)
        .subscribe((translation) =>
          breadcrumbs.push({
            label: isParameter ? url.path : translation,
            link: `/${path}`,
          })
        );
    }
    return breadcrumbs;
  }

  protected isCompanyPage(page: Page): boolean {
    return page.template === 'CompanyPageTemplate';
  }
}
