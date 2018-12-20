import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';

import { CartService } from '@spartacus/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { Cart, OrderEntry, CmsService } from '@spartacus/core';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniCartComponent extends AbstractCmsComponent {
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;

  showProductCount: number;
  banner: { uid: string; typeCode: string };

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef,
    protected cartService: CartService
  ) {
    super(cmsService, cd);
  }

  protected fetchData() {
    this.showProductCount = +this.component.shownProductCount;
    this.banner = this.component.lightboxBannerComponent;

    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService.getEntries();

    super.fetchData();
  }
}
