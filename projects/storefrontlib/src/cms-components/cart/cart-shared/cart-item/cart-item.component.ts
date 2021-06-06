import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEntry, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { CartOutlets } from '../../cart-outlets.model';
import { CartItemContextSource } from './model/cart-item-context-source.model';
import { CartItemContext } from './model/cart-item-context.model';

export interface CartItemComponentOptions {
  isSaveForLater?: boolean;
  optionalBtn?: any;
}

@Component({
  selector: 'cx-cart-item',
  templateUrl: './cart-item.component.html',
  providers: [
    CartItemContextSource,
    { provide: CartItemContext, useExisting: CartItemContextSource },
  ],
})
export class CartItemComponent implements OnInit, OnChanges {
  @Input() compact = false;
  @Input() item: OrderEntry;
  @Input() readonly = false;
  @Input() quantityControl: FormControl;

  // TODO: evaluate whether this is generic enough
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };

  @Input() promotions: Observable<PromotionResult[]>;

  appliedProductPromotions$: Observable<PromotionResult[]>;
  iconTypes = ICON_TYPE;
  readonly CartOutlets = CartOutlets;

  constructor(protected cartItemContextSource: CartItemContextSource) {}

  ngOnInit() {
    this.appliedProductPromotions$ = this.promotions;
  }

  ngOnChanges(changes?: SimpleChanges) {
    if (changes?.compact) {
      this.cartItemContextSource.compact$.next(this.compact);
    }
    if (changes?.readonly) {
      this.cartItemContextSource.readonly$.next(this.readonly);
    }
    if (changes?.item) {
      this.cartItemContextSource.item$.next(this.item);
    }
    if (changes?.quantityControl) {
      this.cartItemContextSource.quantityControl$.next(this.quantityControl);
    }
    if (changes?.options) {
      this.cartItemContextSource.options$.next(this.options);
    }
  }

  isProductOutOfStock(product: any) {
    // TODO Move stocklevelstatuses across the app to an enum
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  removeItem() {
    this.quantityControl.setValue(0);
    this.quantityControl.markAsDirty();
  }
}
