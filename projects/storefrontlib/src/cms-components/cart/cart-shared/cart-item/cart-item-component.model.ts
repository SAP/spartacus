import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry, PromotionLocation } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
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
  private readonly context$$ = new ReplaySubject<CartItemContextModel>();
  readonly context$ = this.context$$.asObservable();
}
