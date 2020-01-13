import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CartService,
  PromotionLocation,
  PromotionResult,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from '../cart-item/cart-item.component';

@Component({
  selector: 'cx-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemListComponent {
  @Input() readonly = false;

  @Input() hasHeader = true;

  private _items: Item[] = [];

  @Input('items')
  // TODO: currently we're getting a new array of items if the cart changes.
  // pretty annoying as it forces a repaint on the screen,
  // which is noticable in the UI.
  set items(items: Item[]) {
    this._items = items;
    this.createForm(items);
  }
  get items(): Item[] {
    return this._items;
  }

  form: FormGroup;

  @Input() potentialProductPromotions: PromotionResult[] = [];
  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  @Input('cartIsLoading')
  set setLoading(value: boolean) {
    if (!this.readonly) {
      // Whenver the cart is loading, we disable the complete form
      // to avoid any user interaction with the cart.
      value
        ? this.form.disable({ emitEvent: false })
        : this.form.enable({ emitEvent: false });
    }
  }

  constructor(protected cartService: CartService) {}

  private createForm(items: Item[]): void {
    this.form = new FormGroup({});
    items.forEach(item => {
      const group = new FormGroup({
        entryNumber: new FormControl((<any>item).entryNumber),
        quantity: new FormControl(item.quantity, { updateOn: 'blur' }),
      });
      if (!item.updateable || this.readonly) {
        group.disable();
      }
      this.form.addControl(item.product.code, group);
    });
  }

  getControl(item: Item): Observable<FormGroup> {
    return this.form.get(item.product.code).valueChanges.pipe(
      // tslint:disable-next-line:deprecation
      startWith(null),
      map(value => {
        if (value) {
          this.cartService.updateEntry(value.entryNumber, value.quantity);
        }
      }),
      map(() => <FormGroup>this.form.get(item.product.code))
    );
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
