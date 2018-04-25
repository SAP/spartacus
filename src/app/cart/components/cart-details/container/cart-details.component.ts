import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';

import * as fromCartStore from '../../../store';
import { CartService } from '../../../services/cart.service';
import { take, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'y-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit {
  cart$;
  entries$;

  form: FormGroup = this.fb.group({
    entryArry: this.fb.array([])
  });

  constructor(
    protected store: Store<fromCartStore.CartState>,
    protected cartService: CartService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cartService.loadCartDetails();
    this.cart$ = this.store.select(fromCartStore.getActiveCart);

    const codes = [];
    this.entries$ = this.store.select(fromCartStore.getEntries).pipe(
      tap(entries => {
        const control = this.form.get('entryArry') as FormArray;
        for (const entry of entries) {
          if (codes.indexOf(entry.product.code) === -1) {
            control.push(this.createEntryFormGroup(entry));
            codes.push(entry.product.code);
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

  removeEntry(entryInfo) {
    this.cartService.removeCartEntry(entryInfo.entry);
    const control = this.form.get('entryArry') as FormArray;
    control.removeAt(entryInfo.index);
  }

  updateEntry(entryInfo) {
    const entryFG = this.form.get('entryArry').value[entryInfo.index];
    this.cartService.updateCartEntry(
      entryInfo.entry.entryNumber,
      entryFG.quantity
    );

    if (entryFG.quantity === 0) {
      const control = this.form.get('entryArry') as FormArray;
      control.removeAt(entryInfo.index);
    }
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
