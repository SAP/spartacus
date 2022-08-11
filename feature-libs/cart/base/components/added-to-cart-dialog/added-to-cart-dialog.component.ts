import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ActiveCartFacade,
  Cart,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { ICON_TYPE, ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
})
export class AddedToCartDialogComponent {
  iconTypes = ICON_TYPE;

  entry$: Observable<OrderEntry | undefined>;
  cart$: Observable<Cart> = this.activeCartFacade.getActive();
  loaded$: Observable<boolean> = this.activeCartFacade.isStable();
  addedEntryWasMerged$: Observable<boolean>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  quantity = 0;
  modalIsOpen = false;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  form: FormGroup = new FormGroup({});

  protected quantityControl$: Observable<FormControl>;

  constructor(
    protected modalService: ModalService,
    protected activeCartFacade: ActiveCartFacade
  ) {}
  /**
   * Returns an observable formControl with the quantity of the cartEntry,
   * but also updates the entry in case of a changed value.
   * The quantity can be set to zero in order to remove the entry.
   */
  getQuantityControl(): Observable<FormControl> {
    if (!this.quantityControl$) {
      this.quantityControl$ = this.entry$.pipe(
        filter((e) => !!e),
        map((entry) => this.getQuantityFormControl(entry)),
        switchMap(() =>
          this.form.valueChanges.pipe(
            // eslint-disable-next-line import/no-deprecated
            startWith(null),
            tap((valueChange) => {
              if (valueChange) {
                this.activeCartFacade.updateEntry(
                  valueChange.entryNumber,
                  valueChange.quantity
                );
                if (valueChange.quantity === 0) {
                  this.dismissModal('Removed');
                }
              } else {
                this.form.markAsPristine();
              }
            })
          )
        ),
        map(() => <FormControl>this.form.get('quantity')),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.quantityControl$;
  }

  init(
    productCode: string,
    quantity: number,
    numberOfEntriesBeforeAdd: number
  ): void {
    // Display last entry for new product code. This always corresponds to
    // our new item, independently of whether merging occured or not
    this.entry$ = this.activeCartFacade.getLastEntry(productCode);
    this.quantity = quantity;
    this.addedEntryWasMerged$ = this.getAddedEntryWasMerged(
      numberOfEntriesBeforeAdd
    );
  }

  protected getAddedEntryWasMerged(
    numberOfEntriesBeforeAdd: number
  ): Observable<boolean> {
    return this.loaded$.pipe(
      filter((loaded) => loaded),
      switchMapTo(this.activeCartFacade.getEntries()),
      map((entries) => entries.length === numberOfEntriesBeforeAdd)
    );
  }

  /**
   * Adds quantity and entryNumber form controls to the FormGroup.
   * Returns quantity form control.
   */
  protected getQuantityFormControl(entry?: OrderEntry): FormControl {
    if (!this.form.get('quantity')) {
      const quantity = new FormControl(entry?.quantity, { updateOn: 'blur' });
      this.form.addControl('quantity', quantity);

      const entryNumber = new FormControl(entry?.entryNumber);
      this.form.addControl('entryNumber', entryNumber);
    } else {
      // set the real quantity added to cart
      this.form.get('quantity')?.setValue(entry?.quantity);
    }

    return <FormControl>this.form.get('quantity');
  }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }
}
