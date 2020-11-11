import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  OrderEntry,
  PromotionLocation,
  PromotionResult,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import {
  CartItemComponentOutlets,
  CartItemContext,
  CartItemContextModel,
} from './cart-item-component.model';

/**
 * @deprecated since 3.0 - use `OrderEntry` instead
 */
export interface Item {
  entryNumber?: number;
  product?: any;
  quantity?: any;
  basePrice?: any;
  totalPrice?: any;
  updateable?: boolean;
  statusSummaryList?: any[];
  configurationInfos?: any[];
}

export interface CartItemComponentOptions {
  isSaveForLater?: boolean;
  optionalBtn?: any;
}

@Component({
  selector: 'cx-cart-item',
  templateUrl: './cart-item.component.html',
  providers: [CartItemContext],
})
export class CartItemComponent implements OnInit, OnChanges {
  @Input() compact = false;
  @Input() item: OrderEntry;
  @Input() readonly = false;
  @Input() quantityControl: FormControl;

  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  // TODO: evaluate whether this is generic enough
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };

  appliedProductPromotions$: Observable<PromotionResult[]>;
  iconTypes = ICON_TYPE;
  readonly Outlets = CartItemComponentOutlets;

  constructor(
    protected promotionService: PromotionService,
    @Optional() protected cartItemContext?: CartItemContext
  ) {}

  ngOnInit() {
    this.appliedProductPromotions$ = this.promotionService.getProductPromotionForEntry(
      this.item,
      this.promotionLocation
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.populateCartItemContext(changes);
  }

  private populateCartItemContext(changes: SimpleChanges) {
    if (this.cartItemContext) {
      const newChunk = Object.entries(changes).reduce(
        (acc, [key, change]) => ({ ...acc, [key]: change.currentValue }),
        {} as CartItemContextModel
      );

      let oldChunk: CartItemContextModel;
      this.cartItemContext.context$
        .subscribe((val) => (oldChunk = val ?? {}))
        .unsubscribe();

      this.cartItemContext['context$$'].next({ ...oldChunk, ...newChunk });
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
