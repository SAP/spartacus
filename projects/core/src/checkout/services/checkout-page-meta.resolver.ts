import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
import { PageType } from '../../occ/occ-models/occ.models';
import { CartService } from '../../cart/facade/cart.service';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageTitleResolver,
  PageRobotsResolver
} from '../../cms/page/page.resolvers';
import { PageMeta, PageRobotsMeta } from '../../cms/model/page.model';

import { Cart } from '../../occ/occ-models/index';

@Injectable({
  providedIn: 'root'
})
export class CheckoutPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageRobotsResolver {
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
          title: this.resolveTitle(cart),
          robots: this.resolveRobots()
        };
      })
    );
  }

  resolveTitle(cart: Cart) {
    return `Checkout ${cart.totalItems} items`;
  }

  resolveRobots(): PageRobotsMeta[] {
    return [PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX];
  }
}
