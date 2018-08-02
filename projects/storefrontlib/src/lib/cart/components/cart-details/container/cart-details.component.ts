import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { CartService } from '../../../services/cart.service';
import * as fromCartStore from '../../../store';

@Component({
  selector: 'y-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit {
  cart$;
  entries$;

  form: FormGroup = this.fb.group({});

  constructor(
    protected store: Store<fromCartStore.CartState>,
    protected cartService: CartService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cartService.loadCartDetails();
    this.cart$ = this.store.select(fromCartStore.getActiveCart);

    this.entries$ = this.store.select(fromCartStore.getEntries).pipe(
      tap(entries => {
        for (const entry of entries) {
          const entryProductCode = entry.product.code;

          if (!this.form.controls[entryProductCode]) {
            this.form.setControl(
              entry.product.code,
              this.createEntryFormGroup(entry)
            );
          } else {
            // update form on entries update
            const entryForm = this.form.controls[entryProductCode] as FormGroup;
            entryForm.controls.quantity.setValue(entry.quantity);
          }
        }
      })
    );
  }

  private createEntryFormGroup(entry) {
    return this.fb.group({
      entryNumber: entry.entryNumber,
      quantity: entry.quantity
    });
  }

  removeEntry(entry) {
    this.cartService.removeCartEntry(entry);
    delete this.form.controls[entry.product.code];
  }

  updateEntry({ entry, updatedQuantity }) {
    this.cartService.updateCartEntry(entry.entryNumber, updatedQuantity);
  }

  getPotentialPromotionForEntry(cart: any, entry: any): any[] {
    return this.getPromotionForEntry(cart.potentialProductPromotions, entry);
  }

  getAppliedPromotionForEntry(cart: any, entry: any): any[] {
    return this.getPromotionForEntry(cart.appliedProductPromotions, entry);
  }

  private getPromotionForEntry(promotions: any[], entry: any): any {
    const entryPromotions = [];
    if (promotions && promotions.length > 0) {
      for (const promotion of promotions) {
        if (
          promotion.description &&
          promotion.consumedEntries &&
          promotion.consumedEntries.length > 0
        ) {
          for (const consumedEntry of promotion.consumedEntries) {
            if (this.isConsumedByEntry(consumedEntry, entry)) {
              entryPromotions.push(promotion);
            }
          }
        }
      }
    }
    return entryPromotions;
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
