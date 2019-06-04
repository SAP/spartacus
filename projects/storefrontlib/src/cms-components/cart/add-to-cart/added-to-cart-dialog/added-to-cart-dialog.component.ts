import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cart, CartService, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { ModalService } from '../../../../shared/components/modal/index';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
})
export class AddedToCartDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;

  entry$: Observable<OrderEntry>;
  cart$: Observable<Cart>;
  loaded$: Observable<boolean>;

  quantity = 0;
  firstUpdate = true;
  showItemIncrLabel: boolean;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  form: FormGroup = this.fb.group({});

  constructor(
    protected modalService: ModalService,
    protected cartService: CartService,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.entry$ = this.entry$.pipe(
      tap(entry => {
        if (entry) {
          const { code } = entry.product;
          if (!this.form.controls[code]) {
            this.form.setControl(code, this.createEntryFormGroup(entry));
          } else {
            const entryForm = this.form.controls[code] as FormGroup;
            entryForm.controls.quantity.setValue(entry.quantity);
          }
          this.form.markAsPristine();

          // Announce in header if Add To Cart button has incremented product
          this.showItemIncrLabel = this.firstUpdate && entry.quantity > 1;
          // Any updates after the first will be flagged as false
          this.firstUpdate = false;
        }
      })
    );
  }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  removeEntry(item: OrderEntry): void {
    this.cartService.removeEntry(item);
    delete this.form.controls[item.product.code];
    this.dismissModal('Removed');
  }

  updateEntry({ item, updatedQuantity }): void {
    this.cartService.updateEntry(item.entryNumber, updatedQuantity);
  }

  private createEntryFormGroup(entry: OrderEntry): FormGroup {
    return this.fb.group({
      entryNumber: entry.entryNumber,
      quantity: entry.quantity,
    });
  }
}
