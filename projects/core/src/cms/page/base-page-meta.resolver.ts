import { Injectable } from '@angular/core';
import { combineLatest, defer, Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { CmsService } from '../facade/cms.service';
import { BreadcrumbMeta, Page, PageRobotsMeta } from '../model/page.model';
import {
  PageBreadcrumbResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from './page.resolvers';
import { RoutingPageMetaResolver } from './routing/routing-page-meta.resolver';

@Injectable({
  providedIn: 'root',
})
export class BasePageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver, PageRobotsResolver {
  constructor(
    protected cmsService: CmsService,
    protected translation: TranslationService,
    protected routingPageMetaResolver: RoutingPageMetaResolver
  ) {}

  /**
   * Helper to provide access to the current CMS page
   */
  protected page$: Observable<Page> = defer(() =>
    this.cmsService.getCurrentPage()
  ).pipe(filter((p) => Boolean(p)));

  protected title$: Observable<string> = this.page$.pipe(map((p) => p.title));
  protected robots$: Observable<PageRobotsMeta[]> = this.page$.pipe(
    map((page) => page.robots)
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
    defer(() => this.routingPageMetaResolver.resolveBreadcrumbs()),
  ]).pipe(
    map((breadcrumbs) => breadcrumbs.flat()),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  resolveTitle(): Observable<string> {
    return this.title$;
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return this.breadcrumb$;
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.robots$;
  }
}
