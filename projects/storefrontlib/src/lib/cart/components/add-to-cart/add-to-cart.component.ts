import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CartService } from '../../services/cart.service';
import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';
import * as fromCartStore from '../../store';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

@Component({
  selector: 'y-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartComponent implements OnInit {
  dialogRef: MatDialogRef<AddedToCartDialogComponent, any>;

  @Input() iconOnly;

  @Input() productCode;
  @Input() quantity = 1;

  cartEntry$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(
    protected dialog: MatDialog,
    protected cartService: CartService,
    protected store: Store<fromCartStore.CartState>
  ) {}

  ngOnInit() {
    if (this.productCode) {
      this.isLoading$ = this.store.select(fromCartStore.getIsLoading);
      this.cartEntry$ = this.store.select(
        fromCartStore.getEntrySelectorFactory(this.productCode)
      );
    }
  }

  addToCart() {
    if (!this.productCode || this.quantity <= 0) {
      return;
    }
    this.openDialog();
    this.cartService.addCartEntry(this.productCode, this.quantity);
  }

  private openDialog(): void {
    this.dialogRef = this.dialog.open(AddedToCartDialogComponent, {
      data: {
        entry$: this.cartEntry$,
        cart$: this.store.select(fromCartStore.getActiveCart),
        isLoading$: this.isLoading$
      }
    });

    this.dialogRef.componentInstance.updateEntryEvent.subscribe((data: any) =>
      this.updateEntry(data)
    );

    this.dialogRef.componentInstance.removeEntryEvent.subscribe((data: any) => {
      this.removeEntry(data);
    });
  }

  private updateEntry({ entry, updatedQuantity }) {
    this.cartService.updateCartEntry(entry.entryNumber, updatedQuantity);
  }
  private removeEntry(entry) {
    this.cartService.removeCartEntry(entry);
    this.dialog.closeAll();
  }
}
