import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { PageRobotsMeta } from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageDescriptionResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';

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
  implements PageTitleResolver, PageDescriptionResolver, PageRobotsResolver {
  protected cart$ = this.activeCartService.getActive();

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
