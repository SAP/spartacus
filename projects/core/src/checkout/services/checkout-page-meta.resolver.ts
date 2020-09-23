import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { PageRobotsMeta } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';

/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`
 * and the `MultiStepCheckoutSummaryPageTemplate`. If the checkout page matches this template,
 * the more generic `ContentPageMetaResolver` is overriden by this resolver.
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

  constructor(
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'MultiStepCheckoutSummaryPageTemplate';
  }

  resolveTitle(): Observable<string> {
    return this.cart$.pipe(
      switchMap((c) =>
        this.translation.translate('pageMetaResolver.checkout.title', {
          count: c.totalItems,
        })
      )
    );
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX]);
  }
}
