import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, isDevMode, PLATFORM_ID } from '@angular/core';
import { defer, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import { RoutingService } from '../../routing/facade/routing.service';
import { resolveApplicable } from '../../util/applicable';
import { uniteLatest } from '../../util/rxjs/unite-latest';
import { isNotNullable } from '../../util/type-guards';
import { Page, PageMeta } from '../model/page.model';
import { PageMetaConfig } from '../page/config/page-meta.config';
import { PageMetaResolver } from '../page/page-meta.resolver';
import { CmsService } from './cms.service';

/**
 * Service that collects the page meta data by using injected page resolvers.
 *
 * Deprecation note: with version 4.0, we'll make the optional constructor arguments mandatory.
 */
// TODO(#10467): Remove and deprecated note.
@Injectable({
  providedIn: 'root',
})
export class PageMetaService {
  private resolvers$: Observable<PageMetaResolver[]> = this.unifiedInjector
    ? (this.unifiedInjector
        .getMulti(PageMetaResolver)
        .pipe(shareReplay({ bufferSize: 1, refCount: true })) as Observable<
        PageMetaResolver[]
      >)
    : of();

  // TODO(#10467): Drop optional constructor arguments.
  constructor(
    protected cms: CmsService,
    protected unifiedInjector?: UnifiedInjector,
    protected pageMetaConfig?: PageMetaConfig,
    @Inject(PLATFORM_ID) protected platformId?: string,
    // TODO(): make routing service mandatory
    protected routingService?: RoutingService
  ) {}

  /**
   * The list of resolver interfaces will be evaluated for the pageResolvers.
   *
   * @deprecated since 3.1, use the configured resolvers instead from `PageMetaConfig.resolvers`.
   */
  // TODO(#10467): Remove and migrate property
  protected resolverMethods: { [key: string]: string } = {
    title: 'resolveTitle',
    heading: 'resolveHeading',
    description: 'resolveDescription',
    breadcrumbs: 'resolveBreadcrumbs',
    image: 'resolveImage',
    robots: 'resolveRobots',
  };

  // TODO(): make routing service mandatory
  protected semanticRoute$: Observable<string | undefined> = this.routingService
    ? defer(() => this.routingService?.getRouterState()).pipe(
        map((routerState) => routerState.state.semanticRoute),
        distinctUntilChanged()
      )
    : of(undefined);

  protected meta$: Observable<PageMeta | null> = this.semanticRoute$.pipe(
    switchMap((semanticRoute) =>
      this.cms.getCurrentPage().pipe(
        filter((page) => isNotNullable(page)),
        switchMap((page) => this.getMetaResolver(page, semanticRoute))
      )
    ),
    switchMap((metaResolver: PageMetaResolver | undefined) =>
      metaResolver ? this.resolve(metaResolver) : of(null)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /**
   * Returns the observed page meta data for the current page.
   *
   * The data is resolved by various PageResolvers, which are configurable.
   */
  getMeta(): Observable<PageMeta | null> {
    return this.meta$;
  }

  /**
   * If a `PageResolver` has implemented a resolver interface, the resolved data
   * is merged into the `PageMeta` object.
   * @param metaResolver
   */
  protected resolve(metaResolver: PageMetaResolver): Observable<PageMeta> {
    const resolverMethods = this.getResolverMethods();
    const resolvedData: Observable<PageMeta>[] = Object.keys(resolverMethods)
      .filter((key) => metaResolver[resolverMethods[key]])
      .map((key) => {
        return metaResolver[resolverMethods[key]]().pipe(
          map((data) => ({ [key]: data }))
        );
      });

    return uniteLatest(resolvedData).pipe(
      map((data) => Object.assign({}, ...data))
    );
  }

  /**
   * Returns an object with resolvers. The object properties represent the `PageMeta` property, i.e.:
   *
   * ```
   * {
   *   title: 'resolveTitle',
   *   robots: 'resolveRobots'
   * }
   * ```
   *
   * This list of resolvers is filtered for CSR vs SSR processing since not all resolvers are
   * relevant during browsing.
   */
  protected getResolverMethods(): { [property: string]: string } {
    let resolverMethods = {};
    const configured = this.pageMetaConfig?.pageMeta?.resolvers;
    if (configured) {
      configured
        // filter the resolvers to avoid unnecessary processing in CSR
        .filter((resolver) => {
          return (
            // always resolve in SSR
            !isPlatformBrowser(this.platformId ?? '') ||
            // resolve in CSR when it's not disabled
            !resolver.disabledInCsr ||
            // resolve in CSR when resolver is enabled in devMode
            (isDevMode() && this.pageMetaConfig?.pageMeta?.enableInDevMode)
          );
        })
        .forEach(
          (resolver) => (resolverMethods[resolver.property] = resolver.method)
        );
    } else {
      resolverMethods = this.resolverMethods;
    }
    return resolverMethods;
  }

  /**
   * Return the resolver with the best match, based on a score
   * generated by the resolver.
   *
   * Resolvers match by default on `PageType` and `page.template`.
   */
  protected getMetaResolver(
    page: Page,
    semanticRoute?: string
  ): Observable<PageMetaResolver | undefined> {
    return this.resolvers$.pipe(
      map((resolvers) => {
        const res = resolveApplicable(
          resolvers,
          [page, semanticRoute],
          [page, semanticRoute]
        );
        console.debug(resolvers); // spike todo remove
        console.debug(page.template, semanticRoute, res.constructor.name); // spike todo remove
        return res;
      })
    );
  }
}
