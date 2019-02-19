import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
import { PageType } from '../../occ/occ-models/occ.models';
import { CartService } from '../../cart/facade/cart.service';
import { PageTitleResolver } from '../../cms/page/page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class CheckoutPageTitleResolver extends PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected cartService: CartService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'MultiStepCheckoutSummaryPageTemplate';
  }

  resolve(): Observable<string> {
    return this.cartService
      .getActive()
      .pipe(map(cart => `Checkout ${cart.totalItems} items`));
  }
}
