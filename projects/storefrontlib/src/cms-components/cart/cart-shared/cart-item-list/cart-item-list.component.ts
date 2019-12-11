import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CartService,
  PromotionResult,
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
  /**
   * @deprecated deprecated since 1.4, using optional to replace
   */
  @Input()
  isReadOnly = false;

  @Input()
  hasHeader = true;

  @Input()
  options: CartItemComponentOptions = {
    isReadOnly: false,
  };

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
  potentialProductPromotions: PromotionResult[] = [];

  @Input()
  cartIsLoading = false;

  form: FormGroup = this.fb.group({});

  private _items: Item[] = [];

  get items(): Item[] {
    return this._items;
  }

  constructor(
    protected cartService: CartService,
    protected fb: FormBuilder,
    protected selectiveCartService: SelectiveCartService,
    private featureConfig: FeatureConfigService
  ) {}

  // TODO remove for 2.0 - left to keep backward compatibility
  ngOnInit(): void {}

  isSaveForLaterEnabled(): boolean {
    return this.featureConfig.isEnabled('saveForLater');
  }

  removeEntry(item: Item): void {
    if (this.options.saveForLaterEnabled) {
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

  getPotentialProductPromotionsForItem(item: Item): PromotionResult[] {
    const entryPromotions: PromotionResult[] = [];
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

  private createEntryFormGroup(entry): FormGroup {
    return this.fb.group({
      entryNumber: entry.entryNumber,
      quantity: entry.quantity,
    });
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
