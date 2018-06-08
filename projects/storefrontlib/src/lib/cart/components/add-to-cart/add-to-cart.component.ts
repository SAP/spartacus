import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { CartService } from '../../services/cart.service';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';
import * as fromCartStore from '../../store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';

@Component({
  selector: 'y-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartComponent implements OnChanges, OnDestroy {
  isLoading = false;
  @Input() iconOnly;

  @Input() productCode;
  @Input() quantity = 1;

  cartEntry$: Observable<any>;

  constructor(
    protected dialog: MatDialog,
    protected cartService: CartService,
    protected store: Store<fromStore.CartState>
  ) {}

  ngOnChanges() {
    if (this.productCode) {
      this.cartEntry$ = this.store
        .select(fromStore.getEntrySelectorFactory(this.productCode))
        .pipe(
          tap(() => {
            this.isLoading = false;
          })
        );
    }
  }

  ngOnDestroy() {}

  addToCart() {
    if (!this.productCode) {
      console.warn('no product code found on this component');
      return;
    }
    this.isLoading = true;
    this.cartService.addCartEntry(this.productCode, this.quantity);

    const dialogRef = this.dialog.open(AddedToCartDialogComponent, {
      data: {
        entry$: this.cartEntry$,
        cart$: this.store.select(fromCartStore.getActiveCart)
      }
    });

    dialogRef.componentInstance.updateEntryEvent.subscribe((data: any) =>
      this.updateEntryFromModal(data)
    );
  }

  private updateEntryFromModal(data) {
    const form = data.form;
    const entry = data.entry;
    const entryFG = form.value.entryForm;
    this.cartService.updateCartEntry(entryFG.entryNumber, entryFG.quantity);
    if (entryFG.quantity === 0) {
      this.dialog.closeAll();
    }
  }
}
