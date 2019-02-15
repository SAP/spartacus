import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../../../../routing/index';
import { Page } from '../../../../cms/index';
import { PageType } from '../../../../occ/index';
import { CartService } from '../../../../cart/index';
import { PageTitleResolver } from '../page-title.resolver';

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
    console.log('page', page);
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
