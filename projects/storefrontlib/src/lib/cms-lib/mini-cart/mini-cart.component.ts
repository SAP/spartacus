import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';

import { CartService } from '../../cart/facade/cart.service';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { CmsService } from '../../cms/facade/cms.service';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniCartComponent extends AbstractCmsComponent {
  cart$: Observable<any>;
  entries$: Observable<any>;

  showProductCount: number;
  banner: any;

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

    this.cart$ = this.cartService.activeCart$;
    this.entries$ = this.cartService.entries$;

    super.fetchData();
  }
}
