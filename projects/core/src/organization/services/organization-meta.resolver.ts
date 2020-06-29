import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { BreadcrumbMeta } from '../../cms/model/page.model';
import {
  PageBreadcrumbResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { RouterState } from '../../routing/store/routing-state';
import { ContentPageMetaResolver } from '../../cms/page/content-page-meta.resolver';

/**
 * Resolves the page data for Organization Pages.
 *
 * The page title, and breadcrumbs are built in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class OrganizationMetaResolver extends ContentPageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  constructor(
    protected routingService: RoutingService,
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super(cms, translation);
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'CompanyPageTemplate';
  }

  protected SEPARATOR = 'organization';

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.translation.translate('common.home'),
      this.routingService.getRouterState(),
    ]).pipe(
      map(([homeLabel, routerState]: [string, RouterState]) =>
        this.resolveBreadcrumbData(homeLabel, routerState)
      )
    );
  }

  protected resolveBreadcrumbData(
    homeLabel: string,
    routerState: RouterState
  ): BreadcrumbMeta[] {
    const breadcrumbs: BreadcrumbMeta[] = [];
    breadcrumbs.push({ label: homeLabel, link: '/' });
    let link = '';
    routerState.state.url
      .split('/')
      .filter(
        (_, index, arr) =>
          index >= arr.findIndex((e) => e === this.SEPARATOR) &&
          index < arr.length - 1
      )
      .forEach((url) => {
        link = `${link}/${url}`;
        const translationKey = `breadcrumbs.${url}`;
        this.translation.translate(translationKey).subscribe((translation) =>
          breadcrumbs.push({
            label: translation.includes(translationKey)
              ? decodeURI(url)
              : translation,
            link,
          })
        );
      });
    return breadcrumbs;
  }
}
