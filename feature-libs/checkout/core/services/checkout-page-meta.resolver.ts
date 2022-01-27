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
import { CheckoutStepService } from '../../components/services/checkout-step.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CheckoutStep } from '@spartacus/checkout/root';

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

  private _steps$: BehaviorSubject<CheckoutStep[]> =
    this.checkoutStepService.steps$;

  private activeStepIndex$: Observable<number> =
    this.checkoutStepService.activeStepIndex$;

  constructor(
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected basePageMetaResolver: BasePageMetaResolver,
    protected checkoutStepService: CheckoutStepService
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
      this.cart$,
      this._steps$,
      this.activeStepIndex$,
    ]).pipe(
      switchMap(([_, steps, index]) =>
        this.translation.translate(steps[index].name).pipe(
          switchMap((step) =>
            this.translation.translate('pageMetaResolver.checkout.title', {
              step: step,
            })
          )
        )
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
