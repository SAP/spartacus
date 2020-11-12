import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry, PromotionLocation } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemComponentOptions } from './cart-item.component';

export enum CartItemComponentOutlets {
  START = 'cx-cart-item.start',
  INFORMATION = 'cx-cart-item.information',
}

export interface CartItemContextModel {
  compact?: boolean;
  readonly?: boolean;
  item?: OrderEntry;
  quantityControl?: FormControl;
  promotionLocation?: PromotionLocation;
  options?: CartItemComponentOptions;
}

@Injectable()
export class CartItemContext {
  context$: Observable<CartItemContextModel> = new BehaviorSubject<
    CartItemContextModel
  >({});
}
