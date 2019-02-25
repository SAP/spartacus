import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
import { PageType } from '../../occ/occ-models/occ.models';
import { CartService } from '../../cart/facade/cart.service';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageTitleResolver } from '../../cms/page/page.resolvers';
import { PageMeta } from '../../cms/model/page.model';

import { Cart } from '../../occ/occ-models/index';

@Injectable({
  providedIn: 'root'
})
export class CheckoutPageTitleResolver extends PageMetaResolver
  implements PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected cartService: CartService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'MultiStepCheckoutSummaryPageTemplate';
  }

  resolve(): Observable<PageMeta> {
    return this.cartService.getActive().pipe(
      map(cart => {
        return {
          title: this.resolveTitle(cart)
        };
      })
    );
  }

  resolveTitle(cart: Cart) {
    return `Checkout ${cart.totalItems} items`;
  }
}
