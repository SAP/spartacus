import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CartService } from '../../cart/facade/cart.service';
import {
  PageMeta,
  PageRobotsMeta,
  USE_SEPARATE_RESOLVERS,
} from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { Cart } from '../../model/cart.model';
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
export class CheckoutPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageRobotsResolver {
  private cart$ = this.cartService.getActive();

  private skipResolver = false;

  constructor(
    protected cartService: CartService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'MultiStepCheckoutSummaryPageTemplate';
  }

  /**
   * The resolve method is no longer preferred and will be removed with release 2.0.
   * The caller `PageMetaService` service is improved to expect all individual resolvers
   * instead, so that the code is easier extensible.
   *
   * @param skip indicates that this method is not used. While this flag is used by the
   * calling `PageMetaService`, it is not ysed by custom subclasses when they call their `super`.
   *
   * @deprecated since version 1.3
   */
  resolve(skip?: boolean): Observable<PageMeta> | any {
    if (skip) {
      this.skipResolver = true;
      return USE_SEPARATE_RESOLVERS;
    }
    return this.cart$.pipe(
      switchMap(cart =>
        combineLatest([this.resolveTitle(cart), this.resolveRobots()])
      ),
      map(([title, robots]) => ({ title, robots }))
    );
  }

  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   */
  resolveTitle(cart?: Cart): Observable<{ title: string } | any> {
    if (cart) {
      return this.translation.translate('pageMetaResolver.checkout.title', {
        count: cart.totalItems,
      });
    } else {
      return this.cart$.pipe(
        switchMap(c =>
          this.translation.translate('pageMetaResolver.checkout.title', {
            count: c.totalItems,
          })
        ),
        map(title => ({ title }))
      );
    }
  }

  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   */
  resolveRobots(): Observable<{ robots: PageRobotsMeta[] } | any> {
    const robots: PageRobotsMeta[] = [
      PageRobotsMeta.NOFOLLOW,
      PageRobotsMeta.NOINDEX,
    ];
    return !this.skipResolver ? of(robots) : of({ robots: robots });
  }
}
