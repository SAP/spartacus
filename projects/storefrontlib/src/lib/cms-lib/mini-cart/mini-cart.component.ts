import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { CartService, CmsMiniCartComponent, Cart } from '@spartacus/core';

import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniCartComponent {
  cart$: Observable<Cart>;

  constructor(
    protected component: CmsComponentData<CmsMiniCartComponent>,
    protected cartService: CartService
  ) {
    this.cart$ = this.cartService.getActive();
  }
}
