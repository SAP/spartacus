import { Component, Input, OnInit } from '@angular/core';
import { CartItemComponentOptions } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-add-to-cart-link',
  templateUrl: './add-to-cart-link.component.html',
})
export class AddToCartLinkComponent implements OnInit {

  @Input() hasStock: boolean = false;
  @Input() maxQuantity: number;
  @Input() quantity = 1;
  @Input() options: CartItemComponentOptions;

  iconTypes = ICON_TYPE;

  constructor() { }

  ngOnInit(): void {
  }

}
