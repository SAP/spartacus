import { Injectable } from '@angular/core';
import {
  BasePageMetaResolver,
  BreadcrumbMeta,
  PageBreadcrumbResolver,
  PageMetaResolver,
  PageTitleResolver,
  PageType,
  RoutingService,
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
 * Resolves the page data for Saved Cart Pages.
 *
 * Breadcrumbs are built in this implementation only.
 *
 * @property {string} SAVED_CART_SEMANTIC_ROUTE the default root path for saved cart pages.
 * @property {string} SAVED_CART_TRANSLATION_KEY the default i18n key for the saved cart breadcrumb label.
 * @property {string} SAVED_CART_HOME_PATH the default path for Saved Cart home poge.
 */
@Injectable({
  providedIn: 'root',
})
export class SavedCartPageMetaResolver
  extends PageMetaResolver
  implements PageBreadcrumbResolver, PageTitleResolver {
  /**
   * Translation key for the breadcrumb of Saved Cart home page
   */
  protected readonly SAVED_CART_TRANSLATION_KEY = 'savedCartList.breadcrumb';

  /**
   * The semantic route of the saved cart landing page. It's used to recognize whether
   * we are on this page. In such a case we avoid showing the breadcrumb for this page.
   */
  protected readonly SAVED_CART_SEMANTIC_ROUTE = 'savedCarts';

  /**
   * Default path for Saved Cart home page
   */
  protected readonly SAVED_CART_HOME_PATH = '/my-account/saved-carts';

  constructor(
    protected basePageMetaResolver: BasePageMetaResolver,
    protected routingService: RoutingService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  /**
   * Breadcrumb of the Saved Cart page.
   * It's empty when the current page is the Saved Cart page.
   */
  protected savedCartPageBreadcrumb$: Observable<BreadcrumbMeta[]> = defer(() =>
    this.routingService.getRouterState()
  ).pipe(
    map((routerState) => routerState?.state?.semanticRoute),
    distinctUntilChanged(),
    switchMap((semanticRoute) => {
      return semanticRoute === this.SAVED_CART_SEMANTIC_ROUTE
        ? of([])
        : this.translation.translate(this.SAVED_CART_TRANSLATION_KEY).pipe(
            map((label) => [
              {
                label,
                link: this.SAVED_CART_HOME_PATH,
              },
            ])
          );
    })
  );

  /**
   * Breadcrumbs returned in the method #resolveBreadcrumbs.
   */
  protected breadcrumbs$: Observable<BreadcrumbMeta[]> = combineLatest([
    this.savedCartPageBreadcrumb$,
    defer(() => this.basePageMetaResolver.resolveBreadcrumbs()),
  ]).pipe(
    map(([savedCartPageBreadcrumb, breadcrumbs]) => {
      if (breadcrumbs) {
        const [home] = breadcrumbs;
        return [home, ...savedCartPageBreadcrumb];
      } else {
        return [...savedCartPageBreadcrumb];
      }
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /**
   * Returns list of breadcrumbs for:
   * - the home page
   * - the saved cart home page (saved cart list)
   * - the saved cart details
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return this.breadcrumbs$;
  }

  resolveTitle(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveTitle();
  }
}
