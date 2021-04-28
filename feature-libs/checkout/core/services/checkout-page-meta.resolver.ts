import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  BasePageMetaResolver,
  PageMetaResolver,
  PageRobotsMeta,
  PageRobotsResolver,
  PageTitleResolver,
  PageType,
  TranslationService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`
 * and the `MultiStepCheckoutSummaryPageTemplate`. If the checkout page matches this template,
 * the more generic `ContentPageMetaResolver` is overridden by this resolver.
 *
 * The page title and robots are resolved in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutPageMetaResolver
  extends PageMetaResolver
  implements PageTitleResolver, PageRobotsResolver {
  protected cart$ = this.activeCartService.getActive();

  // TODO(#10467): Remove deprecated constructors
  constructor(
    translation: TranslationService,
    activeCartService: ActiveCartService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    basePageMetaResolver?: BasePageMetaResolver
  );
  /**
   * @deprecated since 3.1, we'll use the BasePageMetaResolver in future versions
   */
  constructor(
    translation: TranslationService,
    activeCartService: ActiveCartService
  );
  constructor(
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected basePageMetaResolver?: BasePageMetaResolver
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'MultiStepCheckoutSummaryPageTemplate';
  }

  /**
   * Resolves the page title from the translation `pageMetaResolver.checkout.title`
   */
  resolveTitle(): Observable<string> {
    return this.cart$.pipe(
      switchMap((c) =>
        this.translation.translate('pageMetaResolver.checkout.title', {
          count: c.totalItems,
        })
      )
    );
  }

  /**
   * @Override Returns robots for the checkout pages, which default to NOINDEX/NOFOLLOW.
   */
  // TODO(#10467): resolve robots from `BasePageMetaResolver` instead
  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX]);
  }
}
