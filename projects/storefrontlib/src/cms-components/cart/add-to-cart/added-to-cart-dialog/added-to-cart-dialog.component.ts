import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Cart, CartService, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { ModalService } from '../../../../shared/components/modal/index';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
})
export class AddedToCartDialogComponent {
  iconTypes = ICON_TYPE;

  entry$: Observable<OrderEntry>;
  cart$: Observable<Cart>;
  loaded$: Observable<boolean>;
  increment: boolean;

  quantity = 0;

  @ViewChild('dialog', { static: false, read: ElementRef })
  dialog: ElementRef;

  form: FormGroup = new FormGroup({});

  private quantityControl$: Observable<FormControl>;

  constructor(
    protected modalService: ModalService,
    protected cartService: CartService,
    protected fb: FormBuilder
  ) {}

  /**
   * Returns an observable formControl with the quantity of the cartEntry,
   * but also updates the entry in case of a changed value.
   * The quantity can be set to zero in order to remove the entry.
   */
  getQuantityControl(): Observable<FormControl> {
    if (!this.quantityControl$) {
      // observe once
      this.quantityControl$ = this.entry$.pipe(
        filter(e => !!e),
        map(entry => this.getFormControl(entry)),
        switchMap(() =>
          this.form.valueChanges.pipe(
            // tslint:disable-next-line:deprecation
            startWith(null),
            tap(valueChange => {
              if (valueChange) {
                this.cartService.updateEntry(
                  valueChange.entryNumber,
                  valueChange.quantity
                );
                if (valueChange.quantity === 0) {
                  this.dismissModal('Removed');
                }
              }
            })
          )
        ),
        map(() => <FormControl>this.form.get('quantity'))
      );
    }
    return this.quantityControl$;
  }

  private getFormControl(entry: OrderEntry): FormControl {
    if (!this.form.get('quantity')) {
      const quantity = new FormControl(entry.quantity);
      this.form.addControl('quantity', quantity);

      const entryNumber = new FormControl(entry.entryNumber);
      this.form.addControl('entryNumber', entryNumber);
    }
    return <FormControl>this.form.get('quantity');
  }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }
}
