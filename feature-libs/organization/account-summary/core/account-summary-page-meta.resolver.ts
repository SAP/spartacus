import { Injectable } from '@angular/core';
import {
  BreadcrumbMeta,
  ContentPageMetaResolver,
  Page,
  PageBreadcrumbResolver,
  PageDescriptionResolver,
  PageMetaResolver,
  PageRobotsMeta,
  PageRobotsResolver,
  PageTitleResolver,
  PageType,
  RoutingService,
  SemanticPathService,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, defer, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';

/**
 * Resolves the page data for Organization Pages.
 *
 * Breadcrumbs are built in this implementation only.
 *
 * @property {string} ORGANIZATION_SEMANTIC_ROUTE the default root path for organization pages.
 * @property {string} ORGANIZATION_TRANSLATION_KEY the default i18n key for the organization breadcrumb label.
 */
@Injectable({
  providedIn: 'root',
})
export class AccoountSummaryPageMetaResolver
  extends PageMetaResolver
  implements
    PageBreadcrumbResolver,
    PageTitleResolver,
    PageDescriptionResolver,
    PageRobotsResolver
{
  pageTemplate = 'CompanyPageTemplate';
  pageType = PageType.CONTENT_PAGE;

  /**
   * Translation key for the breadcrumb of Organization home page
   */
  protected readonly ORGANIZATION_TRANSLATION_KEY = 'organization.breadcrumb';

  /**
   * The semantic route of the organization landing page. It's used to recognize whether
   * we are on this page. In such a case we avoid showing the breadcrumb for this page.
   */
  protected readonly ORGANIZATION_SEMANTIC_ROUTE = 'organization';

  constructor(
    protected contentPageMetaResolver: ContentPageMetaResolver,
    protected translation: TranslationService,
    protected semanticPath: SemanticPathService,
    protected routingService: RoutingService
  ) {
    super();
  }

  resolveTitle(): Observable<string | undefined> {
    return this.contentPageMetaResolver.resolveTitle();
  }

  resolveDescription(): Observable<string | undefined> {
    return this.contentPageMetaResolver.resolveDescription();
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.contentPageMetaResolver.resolveRobots();
  }

  /**
   * Returns list of breadcrumbs for:
   * - the home page
   * - the organization home page
   * - the organization's child pages (i.e. cost center list)
   * - sub-routes of the organization's child pages (i.e. cost center details, edit cost center, ...)
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return this.breadcrumbs$;
  }

  /**
   * Breadcrumb of the Organization page.
   * It's empty when the current page is the Organization page.
   */
  protected accountSummaryPageBreadcrumb$: Observable<BreadcrumbMeta[]> = defer(
    () => this.routingService.getRouterState()
  ).pipe(
    map((routerState) => routerState?.state?.semanticRoute),
    distinctUntilChanged(),
    switchMap((semanticRoute) => {
      return semanticRoute === 'orgAccountSummary'
        ? this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY).pipe(
            map((label) => [
              {
                label,
                link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
              },
            ])
          )
        : combineLatest([
            this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY),
            this.translation.translate('accountSummary.breadcrumbs.list'),
          ]).pipe(
            map(([orgLabel, _label]) => [
              {
                label: orgLabel,
                link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
              },
              {
                label: 'All Account Summary',
                link: this.semanticPath.get('orgAccountSummary'),
              },
            ])
          );
    })
  );

  /**
   * Breadcrumbs returned in the method #resolveBreadcrumbs.
   */
  protected breadcrumbs$: Observable<BreadcrumbMeta[]> = combineLatest([
    this.accountSummaryPageBreadcrumb$,
    defer(() => this.contentPageMetaResolver.resolveBreadcrumbs()),
  ]).pipe(
    map(([accountSummaryPageBreadcrumb, breadcrumbs = []]) => {
      const [home, ...restBreadcrumbs] = breadcrumbs;
      return [home, ...accountSummaryPageBreadcrumb, ...restBreadcrumbs];
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getScore(page: Page): number {
    return (
      super.getScore(page) +
      (page.label?.startsWith('/organization/account-summary') ? 1 : -1)
    );
  }
}
