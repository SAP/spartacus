/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, PLATFORM_ID } from '@angular/core';
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
  PageDescriptionResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from './page.resolvers';
import { PageLinkService } from './routing/page-link.service';
import { RoutingPageMetaResolver } from './routing/routing-page-meta.resolver';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BasePageMetaResolver
  implements
    PageTitleResolver,
    PageDescriptionResolver,
    PageBreadcrumbResolver,
    PageRobotsResolver,
    CanonicalPageResolver
{
  protected platformId = inject(PLATFORM_ID);
  constructor(
    protected cmsService: CmsService,
    protected translation: TranslationService,
    protected routingPageMetaResolver: RoutingPageMetaResolver,
    protected router: Router,
    protected pageLinkService: PageLinkService
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

  protected description$: Observable<string | undefined> = this.page$.pipe(
    map((p) => p.description)
  );

  protected robots$: Observable<PageRobotsMeta[]> = this.page$.pipe(
    map((page) => page.robots || [])
  );

  /**
   * Breadcrumb for the home page.
   */
  protected homeBreadcrumb$: Observable<BreadcrumbMeta[]> = this.translation
    .translate('common.home')
    .pipe(map((label) => [{ label: label, link: '/' }] as BreadcrumbMeta[]));

  /**
   * All the resolved breadcrumbs (including those from Angular child routes).
   */
  protected breadcrumb$: Observable<BreadcrumbMeta[]> = defer(()=> {
    //During SSR, skip router-based breadcrumbs might not be needed
    if(!isPlatformBrowser(this.platformId)){
      return this.homeBreadcrumb$;
    }
    return combineLatest([
      this.homeBreadcrumb$,
      this.routingPageMetaResolver?.resolveBreadcrumbs() || of([]),
    ]).pipe(
      map((breadcrumbs) => breadcrumbs.flat()),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  });

  resolveTitle(): Observable<string | undefined> {
    return this.title$;
  }

  resolveDescription(): Observable<string | undefined> {
    return this.description$;
  }

  /**
   * Resolves a single breadcrumb item to the home page for each `ContentPage`.
   * The home page label is resolved from the translation service.
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined> {
    return this.breadcrumb$;
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.robots$;
  }

  resolveCanonicalUrl(options?: CanonicalUrlOptions): Observable<string> {
    //During SSR, it should return with the canonical URL immediatly instead of subscribing to router events
    if(!isPlatformBrowser(this.platformId)){
      return of(this.pageLinkService.getCanonicalUrl(options));
    }

    return this.router.events.pipe(
      filter((ev) => ev instanceof NavigationEnd),
      startWith(null),
      map(() => this.pageLinkService.getCanonicalUrl(options))
    );
  }
}
