/*import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartLoaderService } from '../../../data/cart-loader.service';
import { CartModelService } from '../../../data/cart-model.service';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'y-cart-dialog',
    templateUrl: './cart-dialog.component.html',
    styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit, OnDestroy {

    cart;

    constructor(
        protected cd: ChangeDetectorRef,
        private cartModel: CartModelService,
        protected cartLoader: CartLoaderService,
        public dialogRef: MatDialogRef<CartDialogComponent>
    ) { }

    ngOnInit() {
        this.cartModel.getCart().subscribe((cartData) => {
            this.cart = cartData;
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
         this.cd.detach();
    }

    removeEntry(entry, event: Event) {
        event.stopPropagation();
        this.cartLoader.removeCartEntry(entry);
    }

    closeDialog() {
        this.dialogRef.close();
    }

}*/

import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'y-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent {
  onDelete = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  removeEntry(entry, event: Event) {
    this.onDelete.emit(entry);
  }
}
