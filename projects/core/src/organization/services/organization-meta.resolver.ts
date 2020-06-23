import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { BreadcrumbMeta, Page } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
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
  protected organizationPageTitle$: Observable<any> = combineLatest([
    this.cms.getCurrentPage(),
    this.routingService.getRouterState(),
  ]).pipe(
    tap((data) => console.log('organizationPageTitle$', data)),
    filter(Boolean),
    switchMap(([page, route]) =>
      // checking the template to make sure it's a 'my company' page
      this.isCompanyPage(page)
        ? of(Object.values(route.state.url.split('/').slice(-1)))
        : null
    )
  );

  constructor(
    protected routingService: RoutingService,
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'CompanyPageTemplate';
  }

  resolveTitle(): Observable<string> {
    return combineLatest([
      this.organizationPageTitle$,
      this.routingService.getRouterState(),
    ]).pipe(
      tap((data) => console.log('resolveTitle', data)),
      filter(([title, routerState]) => Boolean(title) && Boolean(routerState)),
      switchMap(
        ([
          title,
          {
            state: { params },
          },
        ]) => {
          return Object.keys(params).length &&
            Object.values(params).includes(decodeURI(title[0]))
            ? of(title.map((e) => decodeURI(e)))
            : this.translation.translate(`breadcrumbs.${title[0]}`);
        }
      )
    );
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.translation.translate('common.home'),
      this.routingService.getRouterState(),
    ]).pipe(
      tap((data) => console.log('resolveBreadcrumbs', data)),
      map(([homeLabel, routerState]: [string, RouterState]) =>
        this.resolveBreadcrumbData(homeLabel, routerState)
      )
    );
  }

  protected resolveBreadcrumbData(
    homeLabel: string,
    router: RouterState
  ): BreadcrumbMeta[] {
    const breadcrumbs: BreadcrumbMeta[] = [];
    breadcrumbs.push({ label: homeLabel, link: '/' });
    let link = '';
    router.state.url
      .split('/')
      .filter(
        (_, index, arr) =>
          index >= arr.findIndex((e) => e === 'organization') &&
          index < arr.length - 1
      )
      .forEach((url) => {
        link = `${link}/${url}`;
        this.translation
          .translate(`breadcrumbs.${url}`)
          .subscribe((translation) =>
            breadcrumbs.push({
              label:
                Object.keys(router.state.params).length &&
                Object.values(router.state.params).includes(decodeURI(url))
                  ? decodeURI(url)
                  : translation,
              link,
            })
          );
      });
    return breadcrumbs;
  }

  protected isCompanyPage(page: Page): boolean {
    return page.template === 'CompanyPageTemplate';
  }
}
