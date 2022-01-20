import { Injectable } from '@angular/core';
import {
  BreadcrumbMeta,
  ContentPageMetaResolver,
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
import { combineLatest, defer, Observable, of } from 'rxjs';
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
export class OrganizationPageMetaResolver
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
  protected organizationPageBreadcrumb$: Observable<BreadcrumbMeta[]> = defer(
    () => this.routingService.getRouterState()
  ).pipe(
    map((routerState) => routerState?.state?.semanticRoute),
    distinctUntilChanged(),
    switchMap((semanticRoute) =>
      semanticRoute === this.ORGANIZATION_SEMANTIC_ROUTE
        ? of([])
        : this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY).pipe(
            map((label) => [
              {
                label,
                link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
              },
            ])
          )
    )
  );

  /**
   * Breadcrumbs returned in the method #resolveBreadcrumbs.
   */
  protected breadcrumbs$: Observable<BreadcrumbMeta[]> = combineLatest([
    this.organizationPageBreadcrumb$,
    defer(() => this.contentPageMetaResolver.resolveBreadcrumbs()),
  ]).pipe(
    map(([organizationPageBreadcrumb, breadcrumbs = []]) => {
      const [home, ...restBreadcrumbs] = breadcrumbs;
      return [home, ...organizationPageBreadcrumb, ...restBreadcrumbs];
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
