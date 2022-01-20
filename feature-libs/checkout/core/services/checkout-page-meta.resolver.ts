import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  BasePageMetaResolver,
  Cart,
  PageDescriptionResolver,
  PageMetaResolver,
  PageRobotsMeta,
  PageRobotsResolver,
  PageTitleResolver,
  PageType,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
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
  implements PageTitleResolver, PageDescriptionResolver, PageRobotsResolver
{
  protected cart$: Observable<Cart> = this.activeCartService.getActive();

  constructor(
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected basePageMetaResolver: BasePageMetaResolver
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'MultiStepCheckoutSummaryPageTemplate';
  }

  /**
   * @override
   * Resolves the page title from the translation `pageMetaResolver.checkout.title`. The
   * cart total item `count` is passed to the translation, so it can be used in the title.
   *
   * The title from the page data is ignored for this page title.
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

  resolveDescription(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveDescription();
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver.resolveRobots();
  }
}
