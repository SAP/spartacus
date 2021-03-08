import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, defer, Observable, of } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { CmsService } from '../facade/cms.service';
import { BreadcrumbMeta, Page, PageRobotsMeta } from '../model/page.model';
import { CanonicalUrlOptions } from './config/page-meta.config';
import {
  CanonicalPageResolver,
  PageBreadcrumbResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from './page.resolvers';
import { PageLinkService } from './routing/page-link.service';
import { RoutingPageMetaResolver } from './routing/routing-page-meta.resolver';

@Injectable({
  providedIn: 'root',
})
export class BasePageMetaResolver
  implements
    PageTitleResolver,
    PageBreadcrumbResolver,
    PageRobotsResolver,
    CanonicalPageResolver {
  constructor(
    protected cmsService: CmsService,
    protected translation: TranslationService,
    protected routingPageMetaResolver: RoutingPageMetaResolver,
    protected router?: Router,
    protected pageLinkService?: PageLinkService
  ) {}

  /**
   * Helper to provide access to the current CMS page
   */
  protected page$: Observable<Page> = defer(() =>
    this.cmsService.getCurrentPage()
  ).pipe(filter((p) => Boolean(p)));

  protected title$: Observable<string | undefined> = this.page$.pipe(
    map((p) => p.title)
  );
  protected robots$: Observable<PageRobotsMeta[]> = this.page$.pipe(
    map((page) => page.robots || [])
  );

  /**
   * Breadcrumb for the home page.
   */
  protected homeBreadcrumb$: Observable<
    BreadcrumbMeta[]
  > = this.translation
    .translate('common.home')
    .pipe(map((label) => [{ label: label, link: '/' }] as BreadcrumbMeta[]));

  /**
   * All the resolved breadcrumbs (including those from Angular child routes).
   */
  protected breadcrumb$: Observable<BreadcrumbMeta[]> = combineLatest([
    this.homeBreadcrumb$,
    defer(() => this.routingPageMetaResolver?.resolveBreadcrumbs()),
  ]).pipe(
    map((breadcrumbs) => breadcrumbs.flat()),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  resolveTitle(): Observable<string | undefined> {
    return this.title$;
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined> {
    return this.breadcrumb$;
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.robots$;
  }

  resolveCanonicalUrl(
    url?: string,
    options?: CanonicalUrlOptions
  ): Observable<string> {
    return this.router && this.pageLinkService
      ? this.router.events.pipe(
          filter((ev) => ev instanceof NavigationEnd),
          startWith(null),
          map(() =>
            // tslint:disable-next-line: no-non-null-assertion
            this.pageLinkService!.getCanonicalUrl(options, url)
          )
        )
      : of();
  }
}
