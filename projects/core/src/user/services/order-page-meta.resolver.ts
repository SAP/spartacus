import { Injectable } from '@angular/core';
import { combineLatest, defer, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { BreadcrumbMeta, PageRobotsMeta } from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';

/**
 * Resolves the page data for Order Pages.
 *
 * Breadcrumbs are built in this implementation only.
 *
 * @property {string} ORDER_SEMANTIC_ROUTE the default root path for Order pages.
 * @property {string} ORDER_TRANSLATION_KEY the default i18n key for the Order breadcrumb label.
 * @property {string} ORDER_HOME_PATH the default path for Order home poge.
 */
@Injectable({
  providedIn: 'root',
})
export class OrderPageMetaResolver
  extends PageMetaResolver
  implements PageBreadcrumbResolver, PageTitleResolver, PageRobotsResolver {
  /**
   * Translation key for the breadcrumb of Order home page
   */
  protected readonly ORDER_TRANSLATION_KEY = 'orderDetails.breadcrumb';

  /**
   * The semantic route of the Order Details page. It's used to recognize whether
   * we are on this page. In such a case we are adding additional breadcrumb element.
   */
  protected readonly ORDER_DETAILS_SEMANTIC_ROUTE = 'orderDetails';

  /**
   * The semantic route of the Orders landing page.
   */
  protected readonly ORDER_SEMANTIC_ROUTE = 'orders';

  constructor(
    protected basePageMetaResolver: BasePageMetaResolver,
    protected routingService: RoutingService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'AccountPageTemplate';
    console.log('OrderPageMetaResolver constructor');
  }

  /**
   * Breadcrumb of the Order page.
   * It's empty when the current page is the Order page.
   */
  protected orderPageBreadcrumb$: Observable<BreadcrumbMeta[]> = defer(() =>
    this.routingService.getRouterState()
  ).pipe(
    map((routerState) => routerState?.state?.semanticRoute),
    distinctUntilChanged(),
    switchMap((semanticRoute) => {
      return semanticRoute === this.ORDER_DETAILS_SEMANTIC_ROUTE
        ? of([])
        : this.translation.translate(this.ORDER_TRANSLATION_KEY).pipe(
            map((label) => [
              {
                label,
                link: this.ORDER_SEMANTIC_ROUTE,
              },
            ])
          );
    })
  );

  /**
   * Breadcrumbs returned in the method #resolveBreadcrumbs.
   */
  protected breadcrumbs$: Observable<BreadcrumbMeta[]> = combineLatest([
    this.orderPageBreadcrumb$,
    defer(() => this.basePageMetaResolver.resolveBreadcrumbs()),
  ]).pipe(
    map(([orderPageBreadcrumb, breadcrumbs]) => {
      if (breadcrumbs) {
        const [home] = breadcrumbs;
        return [home, ...orderPageBreadcrumb];
      } else {
        return [...orderPageBreadcrumb];
      }
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /**
   * Returns list of breadcrumbs for:
   * - the home page
   * - the order home page (order history)
   * - the order details
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return this.breadcrumbs$;
  }

  resolveTitle(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveTitle();
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver.resolveRobots();
  }
}
