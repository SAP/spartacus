import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService, PromotionResult } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';
import { Item } from '../cart-item/cart-item.component';

@Component({
  selector: 'cx-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemListComponent {
  @Input() isReadOnly = false;

  @Input() hasHeader = true;

  @Input() items: Item[] = [];

  @Input() potentialProductPromotions: PromotionResult[] = [];

  _loading: boolean;
  @Input('cartIsLoading')
  set setLoading(value: boolean) {
    this._loading = value;
    // whenver the cart is loading, we disable the form
    // to avoid any user interaction with the cart
    value
      ? this.form.disable({ emitEvent: false })
      : this.form.enable({ emitEvent: false });
  }

  private form: FormGroup = new FormGroup({});

  constructor(protected cartService: CartService) {}

  /**
   * Returns an observable to the quantity of the cartEntry, but
   * also updates the entry in case of a changed value.
   * The quantity can be set to zero in order to remove the entry.
   */
  getQuantityControl$(item: Item): Observable<FormControl> {
    let entryForm = this.getEntryFormGroup(item);
    return entryForm.valueChanges.pipe(
      // tslint:disable-next-line:deprecation
      startWith(null),
      tap(valueChange => {
        if (valueChange) {
          this.cartService.updateEntry(
            valueChange.entryNumber,
            valueChange.quantity
          );
          if (valueChange.quantity === 0) {
            this.cartService.removeEntry(item);
            entryForm = null;
          }
        }
      }),
      filter(() => !!entryForm),
      switchMap(() => of(<FormControl>entryForm.get('quantity')))
    );
  }

  // removeEntry(item: Item): void {
  //   this.cartService.removeEntry(item);
  //   delete this.form.controls[item.product.code];
  // }

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

  private getEntryFormGroup(item: Item): FormGroup {
    const { code } = item.product;
    if (!this.form.controls[code]) {
      const formGroup = new FormGroup({
        entryNumber: new FormControl((<any>item).entryNumber),
        quantity: new FormControl(item.quantity),
      });
      this.form.setControl(code, formGroup);
    }
    return <FormGroup>this.form.get(code);
  }

  private isConsumedByEntry(consumedEntry: any, entry: any): boolean {
    const consumendEntryNumber = consumedEntry.orderEntryNumber;
    if (entry.entries && entry.entries.length > 0) {
      for (const subEntry of entry.entries) {
        if (subEntry.entryNumber === consumendEntryNumber) {
          return true;
        }
      }
      return false;
    } else {
      return consumendEntryNumber === entry.entryNumber;
    }
  }
}
