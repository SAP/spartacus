import { Injectable } from '@angular/core';
import { combineLatest, defer, Observable, of } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { CanonicalUrlOptions } from '.';
import { TranslationService } from '../../i18n/translation.service';
import { WindowRef } from '../../window/window-ref';
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
    protected routingPageMetaResolver: RoutingPageMetaResolver,
    protected winRef: WindowRef
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

  /**
   * Resolves the canonical for the page. The canonical page will be created with
   * the following default options:
   * - https is always added (in case this is not forced by the host)
   * - the `www` subdomain is always added
   * - query parameters are removed
   *
   */
  resolveCanonicalUrl(options?: CanonicalUrlOptions): Observable<string> {
    const config = {
      ...({
        forceHttps: true,
        forceWww: true,
        removeQueryParams: true,
        forceTrailingSlash: true,
      } as CanonicalUrlOptions),
      ...options,
    };

    let url = this.winRef.document.location.href;

    // ensure that we always use https
    if (config.forceHttps && url.indexOf('http://') > -1) {
      url = url.replace('http://', 'https://');
    }
    // ensure that we always use www.
    if (config.forceWww && url.indexOf('www.') === -1) {
      url = url.replace('https://', 'https://www.');
    }
    if (config.removeQueryParams && url.indexOf('?') > -1) {
      const urlBeforeQueryParam = url.substr(0, url.indexOf('?'));
      const params = new URLSearchParams(url.substr(url.indexOf('?')));

      url = urlBeforeQueryParam;

      if (Array.isArray(config.removeQueryParams)) {
        config.removeQueryParams.forEach((param) => {
          params.delete(param);
        });
        if (params.toString().length > 0) {
          url = urlBeforeQueryParam + '?' + params.toString();
        }
      }
    }
    if (
      config.forceTrailingSlash &&
      !url.endsWith('/') &&
      url.indexOf('?') === -1
    ) {
      url = url + '/';
    }

    return of(url);
  }
}
