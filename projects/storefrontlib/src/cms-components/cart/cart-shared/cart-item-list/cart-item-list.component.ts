import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CartService,
  PromotionResult,
  PromotionLocation,
  SelectiveCartService,
  FeatureConfigService,
} from '@spartacus/core';
import {
  Item,
  CartItemComponentOptions,
} from '../cart-item/cart-item.component';

@Component({
  selector: 'cx-cart-item-list',
  templateUrl: './cart-item-list.component.html',
})
export class CartItemListComponent implements OnInit {
  @Input()
  isReadOnly = false;

  @Input()
  hasHeader = true;

  @Input()
  options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };
  @Input()
  potentialProductPromotions: PromotionResult[] = [];

  @Input()
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  @Input()
  set items(_items) {
    this._items = _items;
    this.items.forEach(item => {
      const { code } = item.product;
      if (!this.form.controls[code]) {
        this.form.setControl(code, this.createEntryFormGroup(item));
      } else {
        const entryForm = this.form.controls[code] as FormGroup;
        entryForm.controls.quantity.setValue(item.quantity);
      }
    });
  }

  @Input()
  cartIsLoading = false;

  form: FormGroup = this.fb.group({});

  private _items: Item[] = [];

  get items(): Item[] {
    return this._items;
  }

  constructor(
    cartService: CartService,
    fb: FormBuilder,
    selectiveCartService: SelectiveCartService,
    featureConfig: FeatureConfigService
  );

  /**
   * @deprecated Since 1.5
   * Add selectiveCartService authService routingService and featureConfig for save for later.
   * Remove issue: #5958
   */
  constructor(cartService: CartService, fb: FormBuilder);

  constructor(
    protected cartService: CartService,
    protected fb: FormBuilder,
    protected selectiveCartService?: SelectiveCartService,
    private featureConfig?: FeatureConfigService
  ) {}

  // TODO remove for 2.0 - left to keep backward compatibility
  ngOnInit(): void {}

  //TODO remove feature flag for #5958
  isSaveForLaterEnabled(): boolean {
    if (this.featureConfig) {
      return this.featureConfig.isEnabled('saveForLater');
    }
    return false;
  }
  //TODO remove feature flag for #5958

  removeEntry(item: Item): void {
    if (this.selectiveCartService && this.options.isSaveForLater) {
      this.selectiveCartService.removeEntry(item);
    } else {
      this.cartService.removeEntry(item);
    }
    delete this.form.controls[item.product.code];
  }

  updateEntry({
    item,
    updatedQuantity,
  }: {
    item: any;
    updatedQuantity: number;
  }): void {
    this.cartService.updateEntry(item.entryNumber, updatedQuantity);
  }

  private createEntryFormGroup(entry): FormGroup {
    return this.fb.group({
      entryNumber: entry.entryNumber,
      quantity: entry.quantity,
    });
  }

  getPotentialProductPromotionsForItem(item: Item): PromotionResult[] {
    const entryPromotions: PromotionResult[] = [];
    //don't show promotions in saveforlater
    if (this.options.isSaveForLater) {
      return entryPromotions;
    }
    if (
      this.potentialProductPromotions &&
      this.potentialProductPromotions.length > 0
    ) {
      for (const promotion of this.potentialProductPromotions) {
        if (
          promotion.description &&
          promotion.consumedEntries &&
          promotion.consumedEntries.length > 0
        ) {
          for (const consumedEntry of promotion.consumedEntries) {
            if (this.isConsumedByEntry(consumedEntry, item)) {
              entryPromotions.push(promotion);
            }
          }
        }
      }
    }
    return entryPromotions;
  }

  private isConsumedByEntry(consumedEntry: any, entry: any): boolean {
    const consumedEntryNumber = consumedEntry.orderEntryNumber;
    if (entry.entries && entry.entries.length > 0) {
      for (const subEntry of entry.entries) {
        if (subEntry.entryNumber === consumedEntryNumber) {
          return true;
        }
      }
      return false;
    } else {
      return consumedEntryNumber === entry.entryNumber;
    }
  }
}
