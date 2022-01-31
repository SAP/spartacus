import { Injectable } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  BasePageMetaResolver,
  PageDescriptionResolver,
  PageMetaResolver,
  PageRobotsMeta,
  PageRobotsResolver,
  PageTitleResolver,
  PageType,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CheckoutStepService } from '../../base/components/services/checkout-step.service';

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
    protected checkoutStepService: CheckoutStepService,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartFacade,
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
    return combineLatest([
      this.cart$.pipe(
        switchMap((c) =>
          this.translation.translate('pageMetaResolver.checkout.title', {
            count: c.totalItems,
          })
        )
      ),
      this.checkoutStepService.currentStep$.pipe(
        switchMap((step) => this.translation.translate(step.name))
      ),
    ]).pipe(map(([cartTitle, stepTitle]) => `${cartTitle} | ${stepTitle}`));
  }

  resolveDescription(): Observable<string | undefined> {
    return this.basePageMetaResolver.resolveDescription();
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver.resolveRobots();
  }
}
