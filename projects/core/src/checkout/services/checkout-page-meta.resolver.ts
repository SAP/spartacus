import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CartService } from '../../cart/facade/cart.service';
import { PageMeta, PageRobotsMeta } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { Cart } from '../../model/cart.model';
import { PageType } from '../../model/cms.model';
import { TranslationService } from '../../i18n/translation.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageRobotsResolver {
  constructor(
    protected cartService: CartService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'MultiStepCheckoutSummaryPageTemplate';
  }

  resolve(): Observable<PageMeta> {
    return this.cartService.getActive().pipe(
      switchMap(cart =>
        combineLatest([this.resolveTitle(cart), this.resolveRobots()])
      ),
      map(([title, robots]) => ({ title, robots }))
    );
  }

  resolveTitle(cart: Cart): Observable<string> {
    return this.translation.translate('pageMetaResolver.checkout.title', {
      count: cart.totalItems,
    });
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX]);
  }
}
