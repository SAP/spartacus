import { Injectable } from '@angular/core';
import { combineLatest, defer, Observable, of } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { CmsService } from '../facade/cms.service';
import { BreadcrumbMeta, Page, PageRobotsMeta } from '../model/page.model';
import { BasePageMetaResolver } from './base-page-meta.resolver';
import { PageMetaResolver } from './page-meta.resolver';
import {
  CanonicalPageResolver,
  PageBreadcrumbResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from './page.resolvers';
import { RoutingPageMetaResolver } from './routing/routing-page-meta.resolver';

/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`.
 * More specific resolvers for content pages can be implemented by making them more
 * specific, for example by using the page template (see `CartPageMetaResolver`).
 *
 * The page title, and breadcrumbs are resolved in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class ContentPageMetaResolver
  extends PageMetaResolver
  implements
    PageTitleResolver,
    PageBreadcrumbResolver,
    PageRobotsResolver,
    CanonicalPageResolver {
  // TODO(#10467): Remove deprecated constructors
  constructor(
    cmsService: CmsService,
    translation: TranslationService,
    routingPageMetaResolver: RoutingPageMetaResolver,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    basePageMetaResolver?: BasePageMetaResolver
  );
  /**
   * @deprecated since 3.1, we'll use the BasePageMetaResolver in future versions.
   */
  constructor(
    cmsService: CmsService,
    translation: TranslationService,
    routingPageMetaResolver: RoutingPageMetaResolver
  );
  constructor(
    protected cmsService: CmsService,
    protected translation: TranslationService,
    protected routingPageMetaResolver: RoutingPageMetaResolver,
    protected basePageMetaResolver?: BasePageMetaResolver
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  /**
   * Breadcrumb for the home page.
   *
   * @deprecated since 3.1, as we resolve the homeBreadcrumb$ from the `BasePageMetaResolver`
   */
  // TODO(#10467): drop the homeBreadcrumb$ property
  protected homeBreadcrumb$: Observable<
    BreadcrumbMeta[]
  > = this.translation
    .translate('common.home')
    .pipe(map((label) => [{ label: label, link: '/' }] as BreadcrumbMeta[]));

  /**
   * All the resolved breadcrumbs (including those from Angular child routes).
   *
   * @deprecated since 3.1, as we resolve the breadcrumbs$ from the `BasePageMetaResolver`
   */
  // TODO(#10467): drop the breadcrumbs$ property
  protected breadcrumbs$: Observable<BreadcrumbMeta[]> = combineLatest([
    this.homeBreadcrumb$,
    defer(() => this.routingPageMetaResolver.resolveBreadcrumbs()),
  ]).pipe(
    map((breadcrumbs) => breadcrumbs.flat()),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /**
   * Helper to provide access to the current CMS page
   *
   * @deprecated since 3.1, as we resolve the cms page data from the `BasePageMetaResolver`
   */
  // TODO(#10467): drop the cms$ property
  protected cms$: Observable<Page> = defer(() =>
    this.cmsService.getCurrentPage().pipe(filter((p) => Boolean(p)))
  );

  /**
   * @deprecated since 3.1, we'll start using the `BasePageMetaResolver` to resolve
   * the page title
   */
  // TODO(#10467): drop the title$ property
  protected title$: Observable<string | undefined> = this.cms$.pipe(
    map((p) => p.title)
  );

  // TODO(#10467): resolve the title from the `BasePageMetaResolver.resolveTitle()` only
  resolveTitle(): Observable<string | undefined> {
    return this.basePageMetaResolver
      ? this.basePageMetaResolver.resolveTitle()
      : this.title$;
  }

  /**
   * @override
   * Resolves a single breadcrumb item to the home page for each `ContentPage`.
   * The home page label is resolved from the translation service.
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined> {
    return this.basePageMetaResolver
      ? this.basePageMetaResolver.resolveBreadcrumbs()
      : this.breadcrumbs$;
  }

  /**
   * @override
   * This is added in 3.1 and will be ignored if the `BasePageMetaResolver` is not
   * available.
   */
  // TODO(#10467) drop the 3.1 note.
  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver?.resolveRobots() ?? of();
  }

  /**
   * @override resolves the canonical page for the content page.
   */
  resolveCanonicalUrl(): Observable<string | undefined> {
    return this.basePageMetaResolver?.resolveCanonicalUrl() ?? of();
  }
}
