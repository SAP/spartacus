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
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RoutingService } from '../../routing/facade/routing.service';

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
    UrlSegment | Page
  > = this.cms.getCurrentPage().pipe(
    filter(Boolean),
    switchMap((page: Page) =>
      // checking the template to make sure it's a 'my company' page
      this.isCompanyPage(page) ? this.route.snapshot.children[0].url : of(page)
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
    return this.organizationPage$.pipe(
      filter((urlSegment: UrlSegment) => !!urlSegment),
      switchMap((url: UrlSegment) =>
        this.translation.translate('pageMetaResolver.organization.title', {
          title: url.path,
        })
      )
    );
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.organizationPage$.pipe(),
      this.translation.translate('common.home'),
    ]).pipe(map(() => this.resolveBreadcrumbData()));
  }

  protected resolveBreadcrumbData(): BreadcrumbMeta[] {
    const breadcrumbs: BreadcrumbMeta[] = [];
    breadcrumbs.push({ label: '', link: '/' });

    for (const url of this.route.snapshot.children[0].url) {
      breadcrumbs.push({
        label: url.path,
        link: `/${url.path}`,
      });
    }
    breadcrumbs.pop();
    return breadcrumbs;
  }

  protected isCompanyPage(page: Page): boolean {
    return page.template === 'CompanyPageTemplate';
  }
}
