import { Injectable, Optional } from '@angular/core';
import {
  BasePageMetaResolver,
  BreadcrumbMeta,
  ContentPageMetaResolver,
  PageBreadcrumbResolver,
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
  implements PageBreadcrumbResolver, PageTitleResolver, PageRobotsResolver {
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

  /**
   * @deprecated since 3.1, we'll use the BasePageMetaResolver in future versions
   */
  // TODO(#10467): Remove deprecated constructors
  constructor(
    contentPageMetaResolver: ContentPageMetaResolver,
    translation: TranslationService,
    semanticPath: SemanticPathService,
    routingService: RoutingService
  );
  constructor(
    contentPageMetaResolver: ContentPageMetaResolver,
    translation: TranslationService,
    semanticPath: SemanticPathService,
    routingService: RoutingService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    basePageMetaResolver?: BasePageMetaResolver
  );
  constructor(
    protected contentPageMetaResolver: ContentPageMetaResolver,
    protected translation: TranslationService,
    protected semanticPath: SemanticPathService,
    protected routingService: RoutingService,
    @Optional() protected basePageMetaResolver?: BasePageMetaResolver
  ) {
    super();
  }

  /**
   * Breadcrumb of the Organization page.
   * It's empty when the current page is the Organization page.
   */
  protected organizationPageBreadcrumb$: Observable<
    BreadcrumbMeta[]
  > = defer(() => this.routingService.getRouterState()).pipe(
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
    defer(
      // TODO(#10467): Remove usage of contentPageMetaResolver
      () =>
        (
          this.basePageMetaResolver ?? this.contentPageMetaResolver
        ).resolveBreadcrumbs()
    ),
  ]).pipe(
    map(([organizationPageBreadcrumb, breadcrumbs]) => {
      const [home, ...restBreadcrumbs] = breadcrumbs;
      return [home, ...organizationPageBreadcrumb, ...restBreadcrumbs];
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

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

  resolveTitle(): Observable<string> {
    // TODO(#10467): Remove usage of contentPageMetaResolver
    return (
      this.basePageMetaResolver ?? this.contentPageMetaResolver
    ).resolveTitle();
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    // TODO(#10467): Remove usage of contentPageMetaResolver
    return (
      this.basePageMetaResolver ?? this.contentPageMetaResolver
    ).resolveRobots();
  }
}
