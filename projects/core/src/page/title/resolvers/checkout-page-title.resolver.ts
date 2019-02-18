import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../../../routing';
import { Page } from '../../../cms';
import { PageType } from '../../../occ';
import { CartService } from '../../../cart';
import { PageTitleResolver } from './page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class CheckoutPageTitleResolver extends PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected cartService: CartService
  ) {
    super();
  }

  hasMatch(page: Page) {
    return (
      page.type === PageType.CONTENT_PAGE &&
      page.template === 'MultiStepCheckoutSummaryPageTemplate'
    );
  }

  resolve(): Observable<string> {
    return this.cartService
      .getActive()
      .pipe(map(cart => `Checkout ${cart.totalItems} items`));
  }
}
